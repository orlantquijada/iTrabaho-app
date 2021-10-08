import { useJobPosts } from '@/utils/hooks/useJobPosts'

export default function MyJobs() {
  const { jobs, isLoading } = useJobPosts({ params: { recruiterId: 16 } })

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      {jobs?.map((job) => (
        <div key={job.title}>{job.title}</div>
      ))}
    </div>
  )
}
