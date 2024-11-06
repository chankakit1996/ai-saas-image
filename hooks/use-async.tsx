import { useState, useEffect } from 'react'

export function useAsyncHook<T>(promiseFn: Promise<T>): [T | null, boolean] {
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function _fetch() {
      try {
        setLoading(true)
        const response = await promiseFn

        if (response instanceof Response) {
          setResult(await response.json())
        } else {
          setResult(response)
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    _fetch()
  }, [promiseFn])

  return [result, loading]
}
