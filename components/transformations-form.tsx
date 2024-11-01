'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  FormProvider as Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from '@/constants'
import { useState, useTransition } from 'react'
import { AspectRatioKey, debounce, mergeDeep } from '@/lib/utils'
import { updateCredits } from '@/lib/actions/user'
import MediaUploader from './media-uploaded'
import TransformedImage from './transformed-image'
import { getCldImageUrl } from 'next-cloudinary'
import router from 'next/router'
import { addImage, updateImage } from '@/lib/actions/image'

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export const iframeHeight = '600px'

export const containerClassName =
  'w-full h-screen flex items-center justify-center px-4'

export default function TransformationsForm({
  action,
  data: _data,
  userId,
  type,
  creditBalance,
  config: _config,
}: TransformationFormProps) {
  const data = _data ?? null
  const config = _config ?? null

  const initalValues = data && action === 'Update' ? data : defaultValues
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initalValues,
  })
  const transformationType = transformationTypes[type]
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isPending, startTransition] = useTransition()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    if (image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      })

      const imageData = {
        title: values.title,
        publicId: image.publicId,
        transformationType: type,
        width: image.width,
        height: image.height,
        config: transformationConfig,
        secureURL: image.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }

      if (action === 'Add') {
        try {
          const newImage = await addImage({
            image: {
              title: values.title,
              publicId: image.publicId,
              transformationType: type,
              width: image.width!,
              height: image.height!,
              config: transformationConfig,
              secureURL: image.secureURL,
              transformationURL: transformationUrl,
              aspectRatio: values.aspectRatio,
              prompt: values.prompt,
              color: values.color,
            },
            userId,
            path: '/',
          })

          if (newImage) {
            form.reset()
            setImage(image)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.log(error)
        }
      }

      if (action === 'Update') {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              width: imageData.width!,
              height: imageData.height!,
              _id: image._id,
            },
            userId,
            path: `/transformations/${image._id}`,
          })

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    setIsSubmitting(false)
  }
  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config)

    return onChangeField(value)
  }

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value,
        },
      }))
    }, 1000)()

    return onChangeField(value)
  }

  const onTransformHandler = async () => {
    setIsTransforming(true)

    setTransformationConfig(mergeDeep(newTransformation, transformationConfig))

    setNewTransformation(null)

    startTransition(async () => {
      await updateCredits(userId, creditFee)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
        <Card className='w-full'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Title</FormLabel>
                  <FormControl>
                    <Input {...field} className='input-field' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === 'fill' && (
              <FormField
                control={form.control}
                name='aspectRatio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aspect Ratio</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          onSelectFieldHandler(value, field.onChange)
                        }
                        value={field.value}
                      >
                        <SelectTrigger className='select-field'>
                          <SelectValue placeholder='Select size' />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(aspectRatioOptions).map((key) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className='select-item'
                            >
                              {aspectRatioOptions[key as AspectRatioKey].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(type === 'remove' || type === 'recolor') && (
              <div className='prompt-field'>
                <FormField
                  control={form.control}
                  name='prompt'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {type === 'remove'
                          ? 'Object to remove'
                          : 'Object to recolor'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=''
                          value={field.value}
                          className='input-field'
                          onChange={(e) =>
                            onInputChangeHandler(
                              'prompt',
                              e.target.value,
                              type,
                              field.onChange
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {type === 'recolor' && (
                  <FormField
                    control={form.control}
                    name='color'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Replacement Color</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value}
                            className='input-field'
                            onChange={(e) =>
                              onInputChangeHandler(
                                'color',
                                e.target.value,
                                'recolor',
                                field.onChange
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            <div className='media-uploader-field'>
              <FormField
                control={form.control}
                name='publicId'
                render={({ field }) => (
                  <FormItem className='flex size-full flex-col'>
                    <FormControl>
                      <MediaUploader
                        onValueChange={field.onChange}
                        setImage={setImage}
                        publicId={field.value}
                        image={image}
                        type={type}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TransformedImage
                image={image}
                type={type}
                title={form.getValues().title}
                isTransforming={isTransforming}
                setIsTransforming={setIsTransforming}
                transformationConfig={transformationConfig}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className='flex flex-col gap-4'>
              <Button
                type='button'
                className='submit-button capitalize'
                disabled={isTransforming || newTransformation === null}
                onClick={onTransformHandler}
              >
                {isTransforming ? 'Transforming...' : 'Apply Transformation'}
              </Button>
              <Button
                type='submit'
                className='submit-button capitalize'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Save Image'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
