import axios from '@/utils/api/axios'
import useSWR from 'swr'
import { JobPost } from '../types'
import { QueryProps } from '../types/utils'
import { FormFields } from '@/components/JobPost/helpers'

const JOB_POST_MAP: Record<string, 'hiring' | 'active' | 'done'> = {
  H: 'hiring',
  A: 'active',
  D: 'done',
}

type Data = JobPost[]
type Params = {
  recruiterId: number
  status: 'H' | 'A' | 'D'
}

const key = 'jobs'

export function addJobPost(values: FormFields & { recruiterId: number }) {
  return axios.post<JobPost>('api/jobs/create/', values)
}

export function formatJobPost(data: JobPost) {
  const formattedData = {
    ...data,
    datetimeCreated: new Date(data.datetimeCreated),
    // return of api is 'H' | 'A' | 'D' nya easier if kani use nlng ichange kay daghan na ni depend sa 'hiring' | 'active' | 'done' na type
    status: JOB_POST_MAP[data.status],
  } as JobPost

  if (formattedData.status === 'done')
    formattedData['datetimeEnded'] = new Date(formattedData.datetimeEnded)

  return formattedData
}

export function useJobPosts(props: QueryProps<Data, Params> = {}) {
  const {
    isValidating,
    mutate,
    data: jobs,
    error,
  } = useSWR(
    props.params?.recruiterId || props.params?.status
      ? [key, props.params.recruiterId, props.params.status]
      : key,
    () =>
      axios
        .get<Data>(
          props.params?.recruiterId
            ? `api/jobs/${props.params.recruiterId}/recruiter`
            : 'api/jobs/list/',
          props.params?.status
            ? { params: { status: props.params?.status } }
            : undefined
        )
        .then((res) => res.data)
        .then((data) => data.map((job) => formatJobPost(job))),
    props.options
  )

  return {
    isValidating,
    mutate,
    jobs,
    error,
    isLoading: !error && !jobs,
  }
}
