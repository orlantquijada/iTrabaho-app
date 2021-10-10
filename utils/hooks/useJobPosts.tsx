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

const JobPostMap: Record<string, 'hiring' | 'active' | 'done'> = {
  H: 'hiring',
  A: 'active',
  D: 'done',
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
        .then((res) => res.data)
        .then((data) =>
          data
            ? data.map(
                (job) =>
                  ({
                    ...job,
                    datetimeCreated: new Date(job.datetimeCreated),
                    // return of api is 'H' | 'A' | 'D' nya easier if kani use nlng ichange kay daghan na ni depend sa 'hiring' | 'active' | 'done' na type
                    status: JobPostMap[job.status],
                  } as JobPost)
              )
            : data
        ),
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
