import axios from '@/utils/api/axios'
import useSWR from 'swr'
import { Activity } from '../types'
import { QueryProps } from '../types/utils'

type Data = Activity[]
// TODO: add filters soon

const key = 'activities'

function formatActivity(data: Activity) {
  return {
    ...data,
    datetimeCreated: new Date(data.datetimeCreated),
  } as Activity
}

export function useActivities(props: QueryProps<Data> = {}) {
  const {
    isValidating,
    mutate,
    data: activities,
    error,
  } = useSWR([key], () =>
    axios
      .get<Data>('api/activity/', { params: props.params })
      .then((res) => res.data)
      .then((data) => data.map((activity) => formatActivity(activity)))
  )

  return {
    isValidating,
    mutate,
    activities,
    error,
    isLoading: !error && !activities,
  }
}
