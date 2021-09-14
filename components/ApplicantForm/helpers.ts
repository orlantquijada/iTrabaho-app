// types
export interface FormFields {
  firstName: string
  lastName: string
  phoneNumber: string
  sex: 'M' | 'F'
  birthdate: string

  yearsOfExperience: number
  highestEducationAttained: string

  experience: Array<{
    role: string
    company?: string
    location?: string
    start_month?: string
    start_year: string
    end_month?: string
    end_year: string

    details: Array<{
      description: string
    }>
  }>
}

// methods

// constants
export const required = { required: 'Please fill out this field' }
