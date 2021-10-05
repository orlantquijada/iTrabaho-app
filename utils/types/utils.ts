export type Modify<T, R extends Partial<Record<keyof T, any>>> = Omit<
  T,
  keyof R
> &
  R
