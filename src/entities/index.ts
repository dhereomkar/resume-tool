/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: resumes
 * Interface for UserResumes
 */
export interface UserResumes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  skills?: string;
  /** @wixFieldType text */
  education?: string;
  /** @wixFieldType url */
  resumePdfUrl?: string;
}


/**
 * Collection ID: resumetemplates
 * Interface for ResumeTemplates
 */
export interface ResumeTemplates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  templateName?: string;
  /** @wixFieldType text */
  layoutId?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  previewImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType boolean */
  isPremium?: boolean;
  /** @wixFieldType datetime */
  creationDate?: Date | string;
}
