import { JobPostAPIResponse, JobPost, JobPostStatuses } from './types'

const JobPostStatusMap: Record<JobPostStatuses, 'hiring' | 'active' | 'done'> =
  {
    H: 'hiring',
    A: 'active',
    D: 'done',
  }

export function parseJobPostsAPIResponse(jobPost: JobPostAPIResponse): JobPost {
  return {
    ...jobPost,
    status: JobPostStatusMap[jobPost.status],
    datetimeCreated: new Date(jobPost.datetimeCreated),
  }
}
