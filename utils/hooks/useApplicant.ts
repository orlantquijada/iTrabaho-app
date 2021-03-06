import axios from '@/utils/api/axios'
import useSWR from 'swr'

import type { AxiosResponse } from 'axios'
import type {
  ActiveJobPost,
  Applicant,
  DoneJobPost,
  ExtendedApplicant,
  Skill,
} from '../types'
import type { QueryProps } from '../types/utils'
import { formatJobPost } from './useJobPosts'

type Data = ExtendedApplicant
type APIResponse = Applicant & {
  jobs: Array<ActiveJobPost | DoneJobPost>
  skills: Skill[]
}

const key = 'applicants'

export function createApplicant(body: RequestBody) {
  return axios.post('api/applicants/create/', body)
}

function formatApplicantData(data: APIResponse): ExtendedApplicant {
  return {
    ...data,
    activeJobs: data.jobs
      .map((job) => formatJobPost(job))
      .filter((job) => job.status === 'active') as ActiveJobPost[],
    doneJobs: data.jobs
      .map((job) => formatJobPost(job))
      .filter((job) => job.status === 'done') as DoneJobPost[],
  }
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
    () =>
      axios
        .get<Data, AxiosResponse<APIResponse>>(`api/applicants/${id}/get/`)
        .then((res) => res.data)
        .then((data) => formatApplicantData(data)),
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

interface Metrics {
  jobs: number
  rating: number
  reviews: number
}

export function useApplicantMetrics(
  id: Applicant['id'],
  props: QueryProps<Metrics> = {}
) {
  const {
    isValidating,
    mutate,
    data: metrics,
    error,
  } = useSWR(
    ['applicant-metrics', id],
    () =>
      axios.get<Metrics>(`api/applicants/${id}/stats/`).then((res) => res.data),
    props.options
  )

  return {
    isValidating,
    mutate,
    metrics,
    error,
    isLoading: !error && !metrics,
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
  skills: Array<Skill['id']>
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
