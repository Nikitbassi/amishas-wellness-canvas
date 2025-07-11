import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  id: string;
  date: string;
  time_slot: string;
  is_available: boolean;
  max_bookings: number;
  current_bookings: number;
  created_at: string;
}

export const SlotManager = () => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('');
  const [maxBookings, setMaxBookings] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('available_slots')
        .select('*')
        .order('date', { ascending: true })
        .order('time_slot', { ascending: true });

      if (error) {
        throw error;
      }

      setSlots(data || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast({
        title: "Error",
        description: "Failed to fetch appointment slots",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSlot = async () => {
    if (!newSlotDate || !newSlotTime) {
      toast({
        title: "Error",
        description: "Please fill in both date and time",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('available_slots')
        .insert([{
          date: newSlotDate,
          time_slot: newSlotTime,
          max_bookings: maxBookings,
          is_available: true,
          current_bookings: 0
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSlots(prev => [...prev, data].sort((a, b) => 
        a.date.localeCompare(b.date) || a.time_slot.localeCompare(b.time_slot)
      ));
      
      setNewSlotDate('');
      setNewSlotTime('');
      setMaxBookings(1);

      toast({
        title: "Success",
        description: "Appointment slot added successfully",
      });
    } catch (error: any) {
      console.error('Error adding slot:', error);
      toast({
        title: "Error",
        description: error.message?.includes('duplicate') 
          ? "A slot already exists for this date and time" 
          : "Failed to add appointment slot",
        variant: "destructive",
      });
    }
  };

  const deleteSlot = async (slotId: string) => {
    try {
      const { error } = await supabase
        .from('available_slots')
        .delete()
        .eq('id', slotId);

      if (error) {
        throw error;
      }

      setSlots(prev => prev.filter(slot => slot.id !== slotId));

      toast({
        title: "Success",
        description: "Appointment slot deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting slot:', error);
      toast({
        title: "Error",
        description: "Failed to delete appointment slot",
        variant: "destructive",
      });
    }
  };

  const toggleSlotAvailability = async (slotId: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('available_slots')
        .update({ is_available: !isAvailable })
        .eq('id', slotId);

      if (error) {
        throw error;
      }

      setSlots(prev => prev.map(slot => 
        slot.id === slotId 
          ? { ...slot, is_available: !isAvailable }
          : slot
      ));

      toast({
        title: "Success",
        description: `Slot ${!isAvailable ? 'enabled' : 'disabled'} successfully`,
      });
    } catch (error) {
      console.error('Error updating slot:', error);
      toast({
        title: "Error",
        description: "Failed to update slot availability",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Slot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Appointment Slot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Date</label>
              <Input
                type="date"
                value={newSlotDate}
                onChange={(e) => setNewSlotDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Time</label>
              <Input
                type="time"
                value={newSlotTime}
                onChange={(e) => setNewSlotTime(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Max Bookings</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={maxBookings}
                onChange={(e) => setMaxBookings(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addSlot} className="w-full">
                Add Slot
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Available Appointment Slots ({slots.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No appointment slots created yet.</p>
              <p className="text-sm text-gray-400">Add your first slot above to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border rounded-lg p-4 ${
                    !slot.is_available ? 'bg-gray-50 opacity-75' : 'bg-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1 text-blue-600">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{formatDate(slot.date)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{formatTime(slot.time_slot)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          Bookings: {slot.current_bookings}/{slot.max_bookings}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.is_available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.is_available ? 'Available' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={slot.is_available ? "outline" : "default"}
                        onClick={() => toggleSlotAvailability(slot.id, slot.is_available)}
                      >
                        {slot.is_available ? 'Disable' : 'Enable'}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSlot(slot.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
