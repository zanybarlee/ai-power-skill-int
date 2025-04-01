
// Utility functions for handling candidate status display and styling

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'matched':
      return "text-blue-700 bg-blue-100 border-blue-200";
    case 'shortlisted':
      return "text-purple-700 bg-purple-100 border-purple-200";
    case 'interview_accepted':
      return "text-green-700 bg-green-100 border-green-200";
    case 'interview_rejected':
      return "text-red-700 bg-red-100 border-red-200";
    case 'offer_made':
      return "text-amber-700 bg-amber-100 border-amber-200";
    case 'offer_accepted':
      return "text-emerald-700 bg-emerald-100 border-emerald-200";
    case 'offer_rejected':
      return "text-rose-700 bg-rose-100 border-rose-200";
    default:
      return "text-gray-700 bg-gray-100 border-gray-200";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'matched':
      return "Matched";
    case 'shortlisted':
      return "Shortlisted";
    case 'interview_accepted':
      return "Interview Accepted";
    case 'interview_rejected':
      return "Interview Rejected";
    case 'offer_made':
      return "Offer Made";
    case 'offer_accepted':
      return "Offer Accepted";
    case 'offer_rejected':
      return "Offer Rejected";
    default:
      return "Unknown";
  }
};

export const STATUS_OPTIONS = [
  { value: 'matched', label: 'Matched' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview_accepted', label: 'Interview Accepted' },
  { value: 'interview_rejected', label: 'Interview Rejected' },
  { value: 'offer_made', label: 'Offer Made' },
  { value: 'offer_accepted', label: 'Offer Accepted' },
  { value: 'offer_rejected', label: 'Offer Rejected' }
];
