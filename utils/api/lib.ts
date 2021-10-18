import axios from './axios'
import { FormFields } from '@/components/ReviewForm'
import { Skill } from '../types'

export const createReview = (values: FormFields) =>
  // currently, only recruiters can review on the web app
  axios.post('api/review/', values, { params: { fromUserType: 'R' } })

export const getSkillsList = () =>
  axios.get<Skill[]>('api/skills/').then((res) => res.data)
