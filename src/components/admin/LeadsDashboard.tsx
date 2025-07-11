
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { LeadsTable } from './LeadsTable';
import { LeadDetails } from './LeadDetails';
import { Download, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Lead {
  id: string;
  full_name: string;
  age: number | null;
  gender: string | null;
  city: string | null;
  phone_number: string;
  preferred_consultation_date_time: string | null;
  health_goals: string[] | null;
  okay_with_paid_plan: boolean;
  why_lose_weight: string | null;
  health_conditions: string[] | null;
  past_attempts: string[] | null;
  weight_gain_reason: string | null;
  busyness_level: string | null;
  status: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const LeadsDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const filteredLeads = getFilteredLeads();
    const csvContent = [
      // Headers
      'Name,Age,Gender,City,Phone,Email Goals,Paid Plan,Status,Created Date',
      // Data rows
      ...filteredLeads.map(lead => [
        lead.full_name,
        lead.age || '',
        lead.gender || '',
        lead.city || '',
        lead.phone_number,
        lead.health_goals?.join('; ') || '',
        lead.okay_with_paid_plan ? 'Yes' : 'No',
        lead.status || 'new',
        lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Leads data has been exported to CSV",
    });
  };

  const getFilteredLeads = () => {
    return leads.filter(lead => {
      const matchesSearch = lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.phone_number.includes(searchTerm) ||
                           (lead.city && lead.city.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const updateLeadStatus = async (leadId: string, newStatus: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          status: newStatus,
          ...(notes !== undefined && { notes })
        })
        .eq('id', leadId);

      if (error) {
        throw error;
      }

      setLeads(prev => prev.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus, ...(notes !== undefined && { notes }) }
          : lead
      ));

      toast({
        title: "Success",
        description: "Lead updated successfully",
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
    }
  };

  if (selectedLead) {
    return (
      <LeadDetails
        lead={selectedLead}
        onBack={() => setSelectedLead(null)}
        onUpdate={updateLeadStatus}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Leads Management</span>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads by name, phone, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow_up_needed">Follow-up Needed</option>
              <option value="booked">Booked</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <LeadsTable
            leads={getFilteredLeads()}
            loading={loading}
            onSelectLead={setSelectedLead}
            onUpdateStatus={updateLeadStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
};
