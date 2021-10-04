// types
export interface FormFields {
  firstName: string
  lastName: string
  phoneNumber: string
  sex?: 'M' | 'F'
  birthdate?: string
  company?: string
  password: string
  confirm_password: string
}

// methods

// constants
export const required = { required: 'Please fill out this field' }
