/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx'
import qs from 'qs'
import { twMerge } from 'tailwind-merge'

import { aspectRatioOptions } from '@/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message)
    throw new Error(`Error: ${error.message}`)
  } else if (typeof error === 'string') {
    // This is a string error message
    console.error(error)
    throw new Error(`Error: ${error}`)
  } else {
    // This is an unknown type of error
    console.error(error)
    throw new Error(`Unknown error: ${JSON.stringify(error)}`)
  }
}

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`
// ==== End

export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value }

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`
}

export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  )

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export type AspectRatioKey = keyof typeof aspectRatioOptions
export const getImageSize = (
  type: string,
  image: IImage | Partial<IImage>,
  dimension: 'width' | 'height'
): number => {
  if (type === 'fill') {
    return (
      aspectRatioOptions[image?.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    )
  }
  return image?.[dimension] || 1000
}

export const getImageSizeWithAspectRatio = (
  type: string,
  aspectRatio: string | undefined,
  image: IImage | Partial<IImage>,
  dimension: 'width' | 'height'
): number => {
  if (type === 'fill') {
    return (
      aspectRatioOptions[aspectRatio as AspectRatioKey]?.[dimension] || 1000
    )
  }
  return image?.[dimension] || 1000
}

// DOWNLOAD IMAGE
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one')
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobURL

      if (filename && filename.length)
        a.download = `${filename.replace(' ', '_')}.png`
      document.body.appendChild(a)
      a.click()
    })
    .catch((error) => console.log({ error }))
}

export function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function mergeDeep(target: any, ...sources: any[]) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

export function objectify<T>(_obj: T): T {
  if (_obj === null || _obj === undefined) return _obj
  if (typeof _obj === 'object') {
    return JSON.parse(JSON.stringify(_obj))
  }
  return _obj
}

export type RequiredType<T> = {
  [K in keyof T]-?: Exclude<T[K], 'undefined' | null>
}
