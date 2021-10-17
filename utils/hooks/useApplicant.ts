import axios from '@/utils/api/axios'
import useSWR from 'swr'
import { Applicant } from '../types'
import { QueryProps } from '../types/utils'

type Data = Applicant[]

const key = 'applicants'

export function createApplicant(body: RequestBody) {
  return axios.post('api/applicants/create/', body)
}

export function useApplicant(
  id: Applicant['id'],
  props: QueryProps<Data> = {}
) {
  const {
    isValidating,
    mutate,
    data: applicant,
    error,
  } = useSWR(
    [key, id],
    () => axios.get<Data>(`api/applicants/${id}/get/`).then((res) => res.data),
    props.options
  )

  return {
    isValidating,
    mutate,
    applicant,
    error,
    isLoading: !error && !applicant,
  }
}

export interface RequestBody {
  sex?: string
  firstName: string
  lastName: string
  phoneNumber: string
  birthDate: string
  profile: Profile
  LGURepresentativeId: number
}

interface Profile {
  yearsOfExperience: number
  highesteducationAttained: string
  experiences: Experience[]
}

interface Experience {
  details: Detail[]
  role: string
  company?: string
  location?: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
}

export interface Detail {
  description: string
}
