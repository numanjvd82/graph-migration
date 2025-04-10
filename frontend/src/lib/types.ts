export interface Company {
  id: number;
  name: string;
  city: string;
}

export interface CompanyResponse {
  companies: Company[];
  page: number;
  size: number;
  total_pages: number;
  total_companies: number;
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  city: string;
  company_id: number;
}

export interface ContactResponse {
  contacts: Contact[];
  page: number;
  size: number;
  total_pages: number;
  total_contacts: number;
}
