import { Text, Page, AutoComplete } from '@geist-ui/react'

export default function Home() {
  const options = [
    { label: 'London', value: 'london' },
    { label: 'Sydney', value: 'sydney' },
    { label: 'Shanghai', value: 'shanghai' },
  ]

  return (
    <Page>
      <Text h1>Hello World</Text>
      <AutoComplete options={options} />
    </Page>
  )
}
