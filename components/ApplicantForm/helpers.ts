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
    startDate: string
    endDate: string

    details: Array<{
      description: string
    }>
  }>
}

// methods

// constants
export const required = { required: 'Please fill out this field' }

export const allOptions = [
  { label: 'Parking Lot Attendant', value: 'Parking Lot Attendant' },
  { label: 'Cleaner or Janitor', value: 'Cleaner or Janitor' },
  { label: 'Fast Food Worker', value: 'Fast Food Worker' },
  { label: 'Line Operator', value: 'Line Operator' },
  { label: 'Messenger', value: 'Messenger' },
  { label: 'Sewing Machine Operator', value: 'Sewing Machine Operator' },
  { label: 'Construction Laborer', value: 'Construction Laborer' },
  { label: 'Information Desk Clerk', value: 'Information Desk Clerk' },
  { label: 'Vegetable Harvester/Picker', value: 'Vegetable Harvester/Picker' },
  { label: 'Retail Salesperson', value: 'Retail Salesperson' },
  { label: 'Security Guard', value: 'Security Guard' },
  { label: 'Telephone Solicitor', value: 'Telephone Solicitor' },
  { label: 'Waiter/Waitress', value: 'Waiter/Waitress' },
  { label: 'Bartender', value: 'Bartender' },
  { label: 'Flight Attendant', value: 'Flight Attendant' },
  { label: 'Taxi Driver', value: 'Taxi Driver' },
  { label: 'Laundry Operator', value: 'Laundry Operator' },
  { label: "Nurse's Assistant", value: "Nurse's Assistant" },
  { label: 'Furniture Mover', value: 'Furniture Mover' },
  { label: 'File Clerk', value: 'File Clerk' },
  { label: 'Fisherman', value: 'Fisherman' },
  {
    label: 'Secretary/Administrative Assistant',
    value: 'Secretary/Administrative Assistant',
  },
  { label: 'Sales Representative', value: 'Sales Representative' },
  {
    label: 'Customer Service Representative',
    value: 'Customer Service Representative',
  },
  { label: 'Tailor', value: 'Tailor' },
  { label: 'Nurse', value: 'Nurse' },
  { label: 'Office Clerk', value: 'Office Clerk' },
  { label: 'Teacher', value: 'Teacher' },
  { label: "Teacher's Aid", value: "Teacher's Aid" },
  { label: 'Fast Food Cook', value: 'Fast Food Cook' },
  { label: 'Travel Agent', value: 'Travel Agent' },
  { label: 'Mortgage Processor', value: 'Mortgage Processor' },
]
