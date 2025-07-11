
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MapPin, Calendar, Heart, AlertCircle } from 'lucide-react';
import { Lead } from './LeadsDashboard';

interface LeadDetailsProps {
  lead: Lead;
  onBack: () => void;
  onUpdate: (leadId: string, status: string, notes?: string) => void;
}

export const LeadDetails = ({ lead, onBack, onUpdate }: LeadDetailsProps) => {
  const [notes, setNotes] = useState(lead.notes || '');
  const [status, setStatus] = useState(lead.status || 'new');

  const handleSave = () => {
    onUpdate(lead.id, status, notes);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Leads
        </Button>
        <h1 className="text-2xl font-bold">Lead Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Basic Information</span>
                <Badge className={
                  status === 'new' ? 'bg-blue-100 text-blue-800' :
                  status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                  status === 'booked' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-medium">{lead.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Age</label>
                  <p>{lead.age || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Gender</label>
                  <p>{lead.gender || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">City</label>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p>{lead.city || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="font-medium">{lead.phone_number}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Preferred Consultation Date & Time</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p>{formatDate(lead.preferred_consultation_date_time)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Open to Paid Plans</label>
                <p className={`font-medium ${lead.okay_with_paid_plan ? 'text-green-600' : 'text-orange-600'}`}>
                  {lead.okay_with_paid_plan ? '✅ Yes' : '❌ No'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lead.health_goals && lead.health_goals.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Health Goals</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lead.health_goals.map((goal, index) => (
                      <Badge key={index} variant="secondary">{goal}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {lead.why_lose_weight && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Why Lose Weight</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-md">{lead.why_lose_weight}</p>
                </div>
              )}

              {lead.health_conditions && lead.health_conditions.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Health Conditions</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lead.health_conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {lead.past_attempts && lead.past_attempts.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Past Weight Loss Attempts</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lead.past_attempts.map((attempt, index) => (
                      <Badge key={index} variant="secondary">{attempt}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {lead.weight_gain_reason && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Weight Gain Reason</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-md">{lead.weight_gain_reason}</p>
                </div>
              )}

              {lead.busyness_level && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Busyness Level</label>
                  <Badge variant="outline">{lead.busyness_level}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="follow_up_needed">Follow-up Needed</option>
                  <option value="booked">Booked</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Internal Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this lead..."
                  className="mt-1"
                  rows={6}
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{formatDate(lead.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{formatDate(lead.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
