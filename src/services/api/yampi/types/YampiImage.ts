type YampiImageSize = {
  width: number
  height: number
  url: string
}

export type YampiImage = {
  id: number
  processed: boolean
  name: string
  order: number
  extension: string
  filter_image_url: string | null
  small: YampiImageSize
  thumb: YampiImageSize
  medium: YampiImageSize
  large: YampiImageSize
}
