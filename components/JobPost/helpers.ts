import { Skill } from '@/utils/types'

// types
export interface FormFields {
  street: string
  barangay: string
  city: string
  province: string

  description: string
  role: string
  title: string

  skills: Array<Skill['id']>
}

// methods

// constants
export const required = { required: 'Please fill out this field' }
