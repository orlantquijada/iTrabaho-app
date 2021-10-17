import axios from './axios'
import { FormFields } from '@/components/ReviewForm'

export const createReview = (values: FormFields) =>
  // currently, only recruiters can review on the web app
  axios.post('api/review/', values, { params: { fromUserType: 'R' } })
