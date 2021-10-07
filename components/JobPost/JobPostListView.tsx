import { Component } from 'react'
import * as Dialog from '@/components/Dialog'
import { JobPostCard } from '@/components/JobPostCard'
import { styled } from '@/stitches.config'
import { slate } from '@radix-ui/colors'
import JobDialogContent from './JobDialogContent'
import { Applicant, JobPost, Recruiter } from '@/utils/types'

export default class JobPostListView extends Component {
  displayJobPostList = () => {
    return jobs.map((job, index) => (
      <Dialog.Root key={index}>
        <Dialog.CleanedUpTrigger>
          <JobPostCard
            title={job.title}
            description={job.description}
            recruiter={job.recruiter}
            role={job.role}
          />
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

const recruiter: Recruiter = {
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+639222833416',
  fullName: 'John Doe',
  birthdate: new Date(),
  userType: 'R',
}
const recruit: Applicant = {
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+639222833416',
  address: '25 Bayabas Ext., Punta Princes, Cebu City, Cebu',
  fullName: 'John Doe',
  birthdate: new Date(),
  userType: 'A',
  rep: {
    barangay: 'Punta Princesa',
    birthdate: new Date(),
    city: 'Cebu City',
    province: 'Cebu',
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    phoneNumber: '09222833416',
    userType: 'L',
  },
  profile: {
    yearsyearsOfExperience: 4,
    highestEducationAttained: 'Primary School',
    experience: [
      {
        end_month: 'January',
        end_year: 2021,
        start_year: 2020,
        start_month: 'October',
        location: 'Punta Princesa Cebu City',
        role: 'Software Engineer',
        experienceDetails: [
          {
            description: 'wow cool',
          },
        ],
      },
    ],
  },
}

const jobs: JobPost[] = [
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    recruit,
    recruiterReview: {
      comment:
        'Very nice client. Sets clear requirements and reasonable expectations. Will definitely work with him again in the future if needed.',
      fromUser: recruit,
      toUser: recruiter,
      rate: 5,
    },
    recruitReview: {
      comment: 'John is by far the best! Highly recommended',
      fromUser: recruiter,
      toUser: recruit,
      rate: 4,
    },
    role: 'Communications Expert',
    status: 'active',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,

    recruit,
    role: 'Communications Expert',
    status: 'done',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
    datetimeEnded: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    role: 'Communications Expert',
    status: 'hiring',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    role: 'Communications Expert',
    status: 'hiring',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    recruit,
    role: 'Communications Expert',
    status: 'done',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
    datetimeEnded: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    recruit,
    role: 'Communications Expert',
    status: 'active',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    role: 'Communications Expert',
    status: 'hiring',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter,
    recruit,
    role: 'Communications Expert',
    status: 'active',
    street: '25 Sesame St.,',
    barangay: 'Punta Princesa',
    city: 'Cebu City',
    province: 'Cebu',
    datetimeCreated: new Date(),
  },
]
