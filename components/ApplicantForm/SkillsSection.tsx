import { Badge, Flex, FormField } from '@/components'
import { blackA } from '@radix-ui/colors'
import { Cross2Icon, InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import * as Popover from '@/components/Popover'
import * as AlertDialog from '@/components/AlertDialog'

import SectionTitle from './SectionTitle'
import { AutoComplete, Button } from '@geist-ui/react'
import { styled } from '@/stitches.config'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormFields } from './helpers'
import { Skill } from '@/utils/types'

const ALERT_DIALOG_CONTENT_ID = 'alert-content'

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const { control } = useFormContext<FormFields>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  })

  const [allOptions] = useState(() =>
    skills.map((skill) => ({
      label: skill.name,
      value: skill.name,
    }))
  )

  const [skillToAdd, setSkillToAdd] = useState('')
  const [options, setOptions] = useState<typeof allOptions>([])

  const searchHandler = (currentValue: string) => {
    if (!currentValue)
      return setOptions(
        allOptions.filter(
          (option) => !fields.some((skill) => option.label === skill.name)
        )
      )
    const relatedOptions = allOptions.filter((item) =>
      item.value.includes(currentValue)
    )
    setOptions(relatedOptions)
  }

  return (
    <section>
      <Flex align="center" gap="1" css={{ marginBlock: '1em 0.5em' }}>
        <SectionTitle h1 css={{ margin: 0 }}>
          Skills and Expertise
        </SectionTitle>

        <Popover.Root>
          <Popover.CleanupTrigger css={{ padding: 0, display: 'flex' }}>
            <InfoCircledIcon />
          </Popover.CleanupTrigger>
          <Popover.Content side="top">
            <Popover.Arrow />
            <Description>
              Choose your most important skills to show your talents! Make sure
              they match the keywords of the jobs that you prefer as they are
              used for recommendations.
            </Description>
          </Popover.Content>
        </Popover.Root>
      </Flex>

      <Flex gap="2" css={{ flexWrap: 'wrap', width: '600px' }}>
        {fields.map((skill, index) => (
          <StyledBadge key={skill.id}>
            {skill.name}
            <CloseButton type="button" onClick={() => remove(index)}>
              <Cross2Icon />
            </CloseButton>
          </StyledBadge>
        ))}

        <AlertDialog.Root>
          <AlertDialog.CleanedUpTrigger css={{ padding: 0 }}>
            <StyledBadge
              css={{
                $$accent: blackA.blackA12,
                color: '$$accent',
                backgroundColor: 'White',
                boxShadow: 'inset 0 0 0 1px $$accent',
                cursor: 'pointer',
                '&:hover': { background: '$$accent', color: 'White' },
              }}
            >
              <PlusIcon strokeWidth={2} />
              Add skills
            </StyledBadge>
          </AlertDialog.CleanedUpTrigger>

          <AlertDialog.Content id={ALERT_DIALOG_CONTENT_ID}>
            <AlertDialog.Title>Skills and Expertise</AlertDialog.Title>
            <AlertDialog.Description>
              Choose your most important skills to show your talents! Make sure
              they match the keywords of the jobs that you prefer as they are
              used for recommendations.
            </AlertDialog.Description>
            <FormField title="Select a skill">
              <AutoComplete
                width="100%"
                disableFreeSolo
                options={options}
                placeholder="Interior Design"
                type={'default'}
                getPopupContainer={() =>
                  document.getElementById(ALERT_DIALOG_CONTENT_ID)
                }
                onSearch={searchHandler}
                onChange={(val) => setSkillToAdd(val)}
              />
            </FormField>

            <Flex justify="end" gap="2" css={{ mt: '$4' }}>
              <AlertDialog.Cancel asChild>
                <Button width="30%">Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  width="30%"
                  type="secondary"
                  onClick={() => {
                    if (skillToAdd) {
                      append({ name: skillToAdd })
                      setSkillToAdd('')
                    }
                  }}
                >
                  Add
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </section>
  )
}

const Description = styled('p', {
  margin: 0,
  color: blackA.blackA12,
  fontSize: '0.75rem',
  lineHeight: 1.5,
})

const CloseButton = styled('button', {
  all: 'unset',
  display: 'flex',
  cursor: 'pointer',
  transition: 'all 200ms ease',

  '&:hover': {
    color: blackA.blackA12,
  },
})

const StyledBadge = styled(Badge, {
  display: 'flex',
  align: 'center',
  gap: '0.25rem',
  transition: 'all 200ms ease',
})
