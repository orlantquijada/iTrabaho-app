import axios from './axios'
import { FormFields } from '@/components/ReviewForm'

export const createReview = (values: FormFields) =>
  axios.post('api/review/', values)
