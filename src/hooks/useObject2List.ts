import { useMemo } from 'react'

interface ListData {
  title: string
  content: string
}

export function useObject2List(data: Record<string, any>): ListData[] {
  const list = useMemo(() => {
    return Object.entries(data).map(([key, value]) => {
      return {
        title: key,
        content: value
      }
    })
  }, [data])
  return list
}
