import axios from '@/utils/api/axios'
import useSWR from 'swr'
import { JobPost } from '../types'
import { QueryProps } from '../types/utils'

type Data = JobPost

const key = 'jobs'

const JobPostMap: Record<string, 'hiring' | 'active' | 'done'> = {
  H: 'hiring',
  A: 'active',
  D: 'done',
}

const formatJobPost = (data: JobPost): JobPost =>
  ({
    ...data,
    datetimeCreated: new Date(data.datetimeCreated),
    status: JobPostMap[data.status],
  } as JobPost)

// TODO: incorrect api endpoint (endpoint does not exist pa)
export function acceptJobPost(id: JobPost['id']) {
  return axios
    .patch<Data>(`api/job/${id}/patch/`)
    .then((res) => res.data)
    .then((data) => formatJobPost(data))
}

export function useJobPost(id: JobPost['id'], props: QueryProps<Data> = {}) {
  const {
    isValidating,
    mutate,
    data: job,
    error,
  } = useSWR(
    [key, id],
    () =>
      axios
        .get<Data>(`api/jobs/${id}/get/`)
        .then((res) => res.data)
        .then((data) => formatJobPost(data)),
    props.options
  )

  return {
    isValidating,
    mutate,
    job,
    error,
    isLoading: !error && !job,
  }
}
