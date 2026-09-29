export type ResumeCategoryKey = 
  | 'student'
  | 'professor'
  | 'professional'
  | 'developer'
  | 'fresher'
  | 'researcher'
  | 'designer'
  | 'medical';

export interface TemplateDefinition {
  id: string;
  name: string;
  desc: string;
  badge?: string;
}

export interface CategoryDefinition {
  id: ResumeCategoryKey;
  name: string;
  icon: string;
  badge: string;
  description: string;
  features: string[];
  templates: TemplateDefinition[];
  defaultSections: Record<string, boolean>;
}

export interface EducationItem {
  id: string;
  degree: string;
  institute: string;
  board?: string;
  year: string;
  score?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  details: string; // bullet points (one per line)
}

export interface ProjectItem {
  id: string;
  title: string;
  stack?: string;
  link?: string;
  desc: string; // bullet points
}

export interface ResumeData {
  // Contact & Basic Info
  fullName?: string;
  designation?: string;
  jobTitle?: string;
  currentDegree?: string;
  devRole?: string;
  academicTitle?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  webLink?: string;

  // Academic / Faculty specifics
  department?: string;
  institution?: string;
  scholar?: string;
  orcid?: string;
  researchGate?: string;
  instituteWeb?: string;

  // Summaries
  summaryText?: string;

  // Repeatable lists
  educationList: EducationItem[];
  experienceList: ExperienceItem[];
  projectsList: ProjectItem[];

  // Developer specific
  devLanguages?: string;
  devFrameworks?: string;
  devDatabases?: string;
  devTools?: string;

  // Academic specific
  publicationsList?: string;
  patentsList?: string;
  grantsList?: string;
  fdpList?: string;

  // General lists
  skillsText?: string;
  certificationsText?: string;
  workshopsText?: string;
  achievementsText?: string;
  strengthsText?: string;
  hobbiesText?: string;

  // Personal Details
  fatherName?: string;
  motherName?: string;
  dob?: string;
  languages?: string;
  permanentAddress?: string;

  // Declaration
  declarationText?: string;
  decDate?: string;
  decPlace?: string;
}

export interface ResumeRecord {
  id: string;
  title: string;
  category: ResumeCategoryKey;
  templateId: string;
  themeColor: string;
  fontFamily: string;
  spacingScale: 'compact' | 'normal' | 'spacious';
  headerStyle: 'banner' | 'line' | 'left-border' | 'minimal';
  photoShape: 'rounded' | 'circle' | 'square';
  showPageGuides: boolean;
  photo?: string;
  enabledSections: Record<string, boolean>;
  data: ResumeData;
  updatedAt: number;
}
