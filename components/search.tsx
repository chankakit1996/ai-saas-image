'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

import { Search as SearchIcon } from 'lucide-react'

export const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: 'query',
          value: query,
        })

        router.push(newUrl, { scroll: false })
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ['query'],
        })

        router.push(newUrl, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [router, searchParams, query])

  return (
    <div className='search items-center justify-center'>
      <SearchIcon className='mr-[10px]' width={24} height={24} />

      <Input
        className='search-input'
        placeholder='Search'
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
