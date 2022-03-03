export interface User {
  id: number
  firstName: string
  lastName: string
  fullName: string
  phoneNumber: string
  sex?: 'M' | 'F'
  birthdate: Date
  // recruiter | applicant | lgu representative
  userType: 'R' | 'A' | 'L'
  last_login?: Date
}

export interface Representative extends User {
  barangay: string
  city: string
  province: string
  userType: 'L'
}

export interface ExperienceDetail {
  description: string
}

export interface Experience {
  role: string
  company?: string
  location: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  details: ExperienceDetail[]
}

export interface Applicant extends User {
  profile: {
    yearsOfExperience: number
    highesteducationAttained: string
    experiences: Experience[]
  }
  rep: Representative
  address: string
  userType: 'A'
}

export interface ExtendedApplicant extends Applicant {
  doneJobs: DoneJobPost[]
  activeJobs: ActiveJobPost[]
  skills: Skill[]
}

export interface Recruiter extends User {
  company?: string
  userType: 'R'
}

interface BaseJobPost {
  id: number
  street: string
  barangay: string
  city: string
  province: string

  description: string
  role: string
  title: string

  recruiter: Recruiter
  status: 'hiring' | 'active' | 'done'

  datetimeCreated: Date
}

export interface HiringJobPost extends BaseJobPost {
  status: 'hiring'
}

export interface ActiveJobPost extends BaseJobPost {
  status: 'active'
  recruit: Applicant
  applicantReview?: Omit<Review, 'jobPost'>
  recruiterReview?: Omit<Review, 'jobPost'>
}

export interface DoneJobPost extends BaseJobPost {
  status: 'done'
  recruit: Applicant
  applicantReview?: Omit<Review, 'jobPost'>
  recruiterReview?: Omit<Review, 'jobPost'>
  datetimeEnded: Date
}

export type JobPost = HiringJobPost | ActiveJobPost | DoneJobPost

export interface Review {
  rate: 1 | 2 | 3 | 4 | 5
  comment: string
  fromUser: Applicant | Recruiter
  toUser: Applicant | Recruiter
  jobPostId: JobPost
}

export interface Match {
  jobPostId: JobPost
  applicantId: Applicant
  percentage: number
  rank: number
}

export type Activity = { datetimeCreated: Date; type: 'M' | 'R' | 'A' } & (
  | { type: 'M'; content: Match } // match
  | { type: 'R'; content: Review } // review
  | { type: 'A'; content: Required<ActiveJobPost> }
) // accepted

export interface Skill {
  id: number
  name: string
}
