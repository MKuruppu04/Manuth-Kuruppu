export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Biomedical Devices' | 'Analog & Sensors' | 'Microgravity & Research' | 'Embedded Systems';
  overview: string;
  fullDescription: string;
  image: string;
  keyFeatures: string[];
  toolsUsed: string[];
  role: string;
  status: string;
  engineeringDetails: {
    circuitry: string;
    sensorsAndHardware: string;
    simulationAndModeling: string;
    clinicalApplication: string;
  };
  simulationType: 'iv_drip' | 'phonocardiogram' | 'blood_flow' | 'clinostat';
}

export interface VolunteeringRole {
  id: string;
  organization: string;
  initiative: string;
  role: string;
  period: string;
  category: 'IEEE' | 'Department' | 'Community & Database';
  description: string;
  highlights: string[];
}

export interface SoftwareSkill {
  name: string;
  category: 'Engineering & EDA' | 'Simulation & Computing' | 'Media & PR Tools';
  level: 'Skilled' | 'Limited / Foundational';
  focus: string;
  tags: string[];
}

export interface ContactInfo {
  name: string;
  formalName: string;
  preferredName: string;
  title: string;
  cohort: string;
  institution: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
}
