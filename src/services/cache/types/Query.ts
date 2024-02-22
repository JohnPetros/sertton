export type Query<Data> = {
  data: Data
  error: unknown
  isLoading: boolean
  isFetching: boolean
  refetch: VoidFunction
  mutate: (newData: Data) => void
}
