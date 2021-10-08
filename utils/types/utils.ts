import type { PublicConfiguration, Fetcher } from 'swr/dist/types'

export type Modify<T, R extends Partial<Record<keyof T, any>>> = Omit<
  T,
  keyof R
> &
  R

export type QueryProps<
  Data extends any,
  Params extends Record<string, unknown> | undefined = undefined
> = {
  options?: Partial<PublicConfiguration<Data, any, Fetcher<Data>>>
} & (Params extends Record<string, unknown>
  ? {
      params?: Params
    }
  : Record<string, never>)
