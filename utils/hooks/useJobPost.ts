import axios from '@/utils/api/axios'
import { FormFields } from '@/components/JobPost/helpers'
import { User } from '../types'
import { userKey } from './useUser'

type ExtendedFormFields = FormFields & { recruiterId: User['id'] }

export async function postJob(values: FormFields) {
  const { id } = JSON.parse(window.localStorage.getItem(userKey))

  const params: ExtendedFormFields = { ...values, recruiterId: id }
  alert(JSON.stringify(params))
  try {
    const response = await axios.post('api/jobs/create/', params)

    if (response.status === 201) {
      window.location.reload()
      alert(JSON.stringify('Job has been posted'))
    }
  } catch (err) {
    alert(JSON.stringify('Something went wrong. Try again.'))
  }
}
