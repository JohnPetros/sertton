export type NumberInputProps = {
  label: string
  number: number
  min?: number
  max?: number
  onChangeNumber: (value: number) => void
  onReachMax?: () => void
}