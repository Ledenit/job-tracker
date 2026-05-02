export interface Company {
  id: number;
  name: string;
  isAccredited: boolean;
  city: string | null;
}

export interface Application {
  id: number;
  position: string;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  internshipDuration?: number | null;
  status: string; // "Sent" | "Interview" | "Offer" | "Rejected"
  link: string | null;
  format: string;
  employmentType: string;
  experience: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  company: Company;
}

export interface CreateApplicationDTO {
  companyName: string;
  isAccredited: boolean;
  city?: string;
  position: string;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  internshipDuration?: number | null;
  format: string;
  link?: string;
}