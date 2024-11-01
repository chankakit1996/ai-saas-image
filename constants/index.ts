import {
  Settings2,
  House,
  Image,
  Sparkles,
  LucideImageOff,
  Camera,
  User as UserIcon,
  BriefcaseBusiness,
  type LucideIcon,
} from 'lucide-react'

export const navLinks: {
  navMain: { title: string; url: string; icon: LucideIcon }[]
  navSecondary: { title: string; url: string; icon: LucideIcon }[]
} = {
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: House,
    },
    {
      title: 'Image Restore',
      url: '/transformations/add/restore',
      icon: Image,
    },
    {
      title: 'Generative Fill',
      url: '/transformations/add/fill',
      icon: Sparkles,
    },
    {
      title: 'Object Remove',
      url: '/transformations/add/remove',
      icon: LucideImageOff,
    },
    {
      title: 'Object Recolor',
      url: '/transformations/add/recolor',
      icon: Settings2,
    },
    {
      title: 'Background Remove',
      url: '/transformations/add/removeBackground',
      icon: Camera,
    },
  ],
  navSecondary: [
    {
      title: 'Profile',
      url: '/profile',
      icon: UserIcon,
    },
    {
      title: 'Buy Credits',
      url: '/credits',
      icon: BriefcaseBusiness,
    },
  ],
}

export const plans = [
  {
    _id: 1,
    name: 'Free',
    icon: '/assets/icons/free-plan.svg',
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: '20 Free Credits',
        isIncluded: true,
      },
      {
        label: 'Basic Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: false,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: 'Pro Package',
    icon: '/assets/icons/free-plan.svg',
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: '120 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: 'Premium Package',
    icon: '/assets/icons/free-plan.svg',
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: '2000 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: true,
      },
    ],
  },
]

export const transformationTypes: Record<
  TransformationTypeKey,
  {
    type: TransformationTypeKey
    title: string
    subTitle: string
    config: Transformations
    icon: LucideIcon
  }
> = {
  restore: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: Image,
  },
  removeBackground: {
    type: 'removeBackground',
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: Camera,
  },
  fill: {
    type: 'fill',
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: Sparkles,
  },
  remove: {
    type: 'remove',
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: LucideImageOff,
  },
  recolor: {
    type: 'recolor',
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: Settings2,
  },
}

export const aspectRatioOptions = {
  '1:1': {
    aspectRatio: '1:1',
    label: 'Square (1:1)',
    width: 1000,
    height: 1000,
  },
  '3:4': {
    aspectRatio: '3:4',
    label: 'Standard Portrait (3:4)',
    width: 1000,
    height: 1334,
  },
  '9:16': {
    aspectRatio: '9:16',
    label: 'Phone Portrait (9:16)',
    width: 1000,
    height: 1778,
  },
}

export const defaultValues = {
  title: '',
  aspectRatio: '',
  color: '',
  prompt: '',
  publicId: '',
}

export const creditFee = -1
