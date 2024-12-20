'use client'

import { useToast } from '@/hooks/use-toast'
import { dataUrl, getImageSize } from '@/lib/utils'
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { Plus } from 'lucide-react'

type MediaUploaderProps = {
  onValueChange: (value: {
    publicId?: string
    width?: number
    height?: number
    secureURL?: string
  }) => void
  setImage: React.Dispatch<
    React.SetStateAction<NonNullable<TransformationFormProps['data']>['image']>
  >
  image: NonNullable<TransformationFormProps['data']>['image']
  type: string
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: CloudinaryUploadWidgetResults) => {
    console.log(result)
    const info = result?.info as CloudinaryUploadWidgetInfo
    setImage((prevState) => {
      return {
        ...prevState,
        publicId: info?.public_id,
        width: info?.width,
        height: info?.height,
        secureURL: info?.secure_url,
      }
    })

    onValueChange({
      publicId: info?.public_id,
      width: info?.width,
      height: info?.height,
      secureURL: info?.secure_url,
    })

    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast',
    })
  }

  const onUploadErrorHandler = () => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast',
    })
  }

  return (
    // TODO
    // change upload preset to env variable
    <CldUploadWidget
      uploadPreset='owtktu1h_pickure'
      options={{
        multiple: false,
        resourceType: 'image',
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className='flex flex-col gap-4'>
          {image.publicId ? (
            <>
              <div className='cursor-pointer overflow-hidden rounded-[10px]'>
                <CldImage
                  width={getImageSize(type, image, 'width')}
                  height={getImageSize(type, image, 'height')}
                  src={image.publicId}
                  alt='image'
                  sizes={'(max-width: 767px) 100vw, 50vw'}
                  placeholder={dataUrl as PlaceholderValue}
                  className='media-uploader_cldImage'
                />
              </div>
            </>
          ) : (
            <div className='media-uploader_cta' onClick={() => open()}>
              <div className='media-uploader_cta-image'>
                <Plus width={24} height={24} />
              </div>
              <p className='p-14-medium'>Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
