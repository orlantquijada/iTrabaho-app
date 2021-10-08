import axios from '@/utils/api/axios'
import useSWR from 'swr'
import { JobPost } from '../types'
import { QueryProps } from '../types/utils'
import { FormFields } from '@/components/JobPost/helpers'

type Data = JobPost[]
type Params = {
  recruiterId: number
}

const key = 'jobs'

export function addJobPost(values: FormFields & { recruiterId: number }) {
  return axios.post<JobPost>('api/jobs/create/', values)
}

export function useJobPosts(props: QueryProps<Data, Params> = {}) {
  const {
    isValidating,
    mutate,
    data: jobs,
    error,
  } = useSWR(
    props.params?.recruiterId ? [key, props.params.recruiterId] : key,
    () =>
      axios
        .get<Data>(
          props.params?.recruiterId
            ? `api/jobs/${props.params.recruiterId}/recruiter`
            : 'api/jobs/list/'
        )
        .then((res) => res.data),
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
