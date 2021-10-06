export type JobPostStatuses = 'H' | 'A' | 'D'

export type Modify<T, R extends Partial<Record<keyof T, any>>> = Omit<
  T,
  keyof R
> &
  R

export interface User {
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
  start_month: string
  start_year: number
  end_month: string
  end_year: number
  experienceDetails: ExperienceDetail[]
}

export interface Applicant extends User {
  profile: {
    yearsyearsOfExperience: number
    highestEducationAttained: string
    experience: Experience[]
  }
  rep: Representative
  address: string
  userType: 'A'
}

export interface Recruiter extends User {
  company?: string
  userType: 'R'
}

export interface JobPostAPIResponse {
  id: number
  street: string
  barangay: string
  city: string
  province: string

  description: string
  role: string
  title: string

  recruit?: Applicant
  recruiter: Recruiter

  status: JobPostStatuses
  datetimeCreated: string
}

export type JobPost = Modify<
  JobPostAPIResponse,
  {
    datetimeCreated: Date
    status: 'hiring' | 'active' | 'done'
  }
>
export interface Review {
  rate: 1 | 2 | 3 | 4 | 5
  comment: string
  fromUser: Applicant | Recruiter
  toUser: Applicant | Recruiter
  jobPost: JobPost
}

export interface Match {
  jobPost: JobPost
  applicant: Applicant
  percentage: number
  rank: number
}
