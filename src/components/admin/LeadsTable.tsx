
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Phone, Mail } from 'lucide-react';
import { Lead } from './LeadsDashboard';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: string) => void;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  follow_up_needed: 'bg-orange-100 text-orange-800',
  booked: 'bg-green-100 text-green-800',
  converted: 'bg-purple-100 text-purple-800',
  closed: 'bg-gray-100 text-gray-800',
};

export const LeadsTable = ({ leads, loading, onSelectLead, onUpdateStatus }: LeadsTableProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No leads found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium text-lg">{lead.full_name}</h3>
                <Badge 
                  className={statusColors[lead.status as keyof typeof statusColors] || statusColors.new}
                >
                  {lead.status || 'new'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {lead.phone_number}
                </div>
                {lead.city && (
                  <div>📍 {lead.city}</div>
                )}
                {lead.age && (
                  <div>👤 {lead.age} years old</div>
                )}
                <div>
                  💰 {lead.okay_with_paid_plan ? 'Open to paid plans' : 'Prefers free options'}
                </div>
              </div>
              
              {lead.health_goals && lead.health_goals.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Goals: </span>
                  <span className="text-xs">{lead.health_goals.join(', ')}</span>
                </div>
              )}
              
              <div className="text-xs text-gray-400 mt-1">
                Created: {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'Unknown'}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={lead.status || 'new'}
                onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                className="text-xs px-2 py-1 border rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="follow_up_needed">Follow-up Needed</option>
                <option value="booked">Booked</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSelectLead(lead)}
                className="flex items-center gap-1"
              >
                <Eye className="h-3 w-3" />
                View
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
