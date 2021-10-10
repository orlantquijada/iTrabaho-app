import { Component } from 'react'
import * as Dialog from '@/components/Dialog'
import { JobPostCard } from '@/components/JobPostCard'
import { styled } from '@/stitches.config'
import { slate } from '@radix-ui/colors'
import JobDialogContent from './JobDialogContent'
import { JobPost } from '@/utils/types'
import { Link } from '..'
import { Router, withRouter } from 'next/router'

interface Props {
  jobId?: number
  jobs: JobPost[]
  router: Router
}

class JobPostListView extends Component<Props> {
  onOpenChange = (open: boolean) => {
    if (!open) this.props.router.push('/jobs')
  }

  displayJobPostList = () => {
    return this.props.jobs.map((job, index) => (
      <Dialog.Root
        key={index}
        open={job.id === this.props.jobId}
        onOpenChange={this.onOpenChange}
      >
        <Dialog.CleanedUpTrigger asChild>
          <Link
            nextLinkProps={{
              scroll: false,
              shallow: true,
              href: {
                query: {
                  job: job.id,
                },
              },
            }}
            css={{ textDecoration: 'none' }}
          >
            <JobPostCard
              title={job.title}
              description={job.description}
              recruiter={job.recruiter}
              role={job.role}
            />
          </Link>
        </Dialog.CleanedUpTrigger>
        <JobDialogContent {...job} />
      </Dialog.Root>
    ))
  }

  render() {
    return <JobsListContainer>{this.displayJobPostList()}</JobsListContainer>
  }
}

const JobsListContainer = styled('div', {
  $$border: `1px solid ${slate.slate6}`,
  borderInline: '$$border',
  borderTop: '$$border',

  '& > button': {
    borderBottom: '$$border',
  },
})

export default withRouter(JobPostListView)

// const recruiter: Recruiter = {
//   id: 1,
//   firstName: 'john',
//   lastName: 'doe',
//   phoneNumber: '+639222833416',
//   fullName: 'john doe',
//   birthdate: new Date(),
//   userType: 'R',
// }
// const recruit: Applicant = {
//   id: 1,
//   firstName: 'john',
//   lastName: 'doe',
//   phoneNumber: '+639222833416',
//   address: '25 bayabas ext., punta princes, cebu city, cebu',
//   fullName: 'john doe',
//   birthdate: new Date(),
//   userType: 'A',
//   rep: {
//     id: 1,
//     barangay: 'punta princesa',
//     birthdate: new Date(),
//     city: 'cebu city',
//     province: 'cebu',
//     firstName: 'jane',
//     lastName: 'doe',
//     fullName: 'jane doe',
//     phoneNumber: '09222833416',
//     userType: 'L',
//   },
//   profile: {
//     yearsOfExperience: 4,
//     highestEducationAttained: 'primary school',
//     experience: [
//       {
//         end_month: 'january',
//         end_year: 2021,
//         start_year: 2020,
//         start_month: 'october',
//         location: 'punta princesa cebu city',
//         role: 'software engineer',
//         experienceDetails: [
//           {
//             description: 'wow cool',
//           },
//         ],
//       },
//     ],
//   },
// }

// const jobs: JobPost[] = [
//   {
//     title: 'create a social media strategy for my business',
//     id: 1,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     recruit,
//     recruiterReview: {
//       comment:
//         'very nice client. sets clear requirements and reasonable expectations. will definitely work with him again in the future if needed.',
//       fromUser: recruit,
//       toUser: recruiter,
//       rate: 5,
//     },
//     recruitReview: {
//       comment: 'john is by far the best! highly recommended',
//       fromUser: recruiter,
//       toUser: recruit,
//       rate: 4,
//     },
//     role: 'communications expert',
//     status: 'active',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 2,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,

//     recruit,
//     role: 'communications expert',
//     status: 'done',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//     datetimeEnded: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 3,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     role: 'communications expert',
//     status: 'hiring',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 4,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     role: 'communications expert',
//     status: 'hiring',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 5,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     recruit,
//     role: 'communications expert',
//     status: 'done',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//     datetimeEnded: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 6,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     recruit,
//     role: 'communications expert',
//     status: 'active',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 7,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     role: 'communications expert',
//     status: 'hiring',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//   },
//   {
//     title: 'create a social media strategy for my business',
//     id: 8,
//     description:
//       'social media strategy developed for your campaign, event, or general business promotion. i have 16 years of experience developing social media strategies and content, including copy and graphics. the strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
//     recruiter,
//     recruit,
//     role: 'communications expert',
//     status: 'active',
//     street: '25 sesame st.,',
//     barangay: 'punta princesa',
//     city: 'cebu city',
//     province: 'cebu',
//     datetimeCreated: new Date(),
//   },
// ]
