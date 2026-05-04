// types.ts
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  companyIcon?: string;
  technologies?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  issuerIcon?: string;
  verified?: boolean;
}

export interface Language {
  name: string;
  level: string;
  proficiency: number;
}

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  banner: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  about: string;
  skills: string[];
  experience: Experience[];
  certifications: Certification[];
  languages?: Language[];
}