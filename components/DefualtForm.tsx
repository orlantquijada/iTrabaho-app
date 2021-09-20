import { styled } from '@/stitches.config'
import React, { ComponentProps, ReactElement } from 'react'
import { gridStyles } from './Grid'

export default function DefualtForm(
  props: ComponentProps<typeof Form>
): ReactElement {
  return <Form {...props}>{props.children}</Form>
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
