'use client'

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { Download, LoaderCircle } from 'lucide-react'
import React from 'react'

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {hasDownload && (
        <div className='flex-between'>
          <h3 className='h3-bold text-dark-600'>Transformed</h3>
          <button className='download-btn' onClick={downloadHandler}>
            <Download width={24} height={24} className='pb-[6px]' />
          </button>
        </div>
      )}

      {image?.publicId && transformationConfig ? (
        <div className='relative'>
          <CldImage
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'height')}
            src={image?.publicId}
            alt={image.title || 'Image'}
            sizes={'(max-width: 767px) 100vw, 50vw'}
            placeholder={dataUrl as PlaceholderValue}
            className='transformed-image'
            onLoad={() => {
              if (setIsTransforming) setIsTransforming(false)
            }}
            onError={() => {
              debounce(() => {
                if (setIsTransforming) setIsTransforming(false)
              }, 8000)()
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className='flex-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-dark-700'>
              <LoaderCircle width={50} height={50} className='animate-spin' />
              <p className='text-white/80'>Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className='transformed-placeholder'>Transformed Image</div>
      )}
    </div>
  )
}

export default TransformedImage
