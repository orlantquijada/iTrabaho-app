import axios from '@/utils/api/axios'
import useSWR from 'swr'
import { Applicant } from '../types'
import { QueryProps } from '../types/utils'

type Data = Applicant[]
type Params = {
  jobPostId?: number
  LGURepresentative?: number
}

const key = 'applicants'

export function useApplicants(props: QueryProps<Data, Params> = {}) {
  const {
    isValidating,
    mutate,
    data: applicants,
    error,
  } = useSWR(
    [key, props.params?.jobPostId, props.params?.LGURepresentative],
    () =>
      axios
        .get<Data>('api/applicants/list', { params: props.params })
        .then((res) => res.data)
  )

  return {
    isValidating,
    mutate,
    applicants,
    error,
    isLoading: !error && !applicants,
  }
}
