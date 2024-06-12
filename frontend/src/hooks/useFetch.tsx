import { useEffect, useRef, useState } from 'react'
import { IData } from '../types'

export function useFecth(url: RequestInfo, config?: RequestInit) {
  const [data, setData] = useState<IData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [update, setUpdate] = useState(false)

  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setData(null)
      setUpdate(false)

      try {
        const response = await fetch(url, {
          signal,
          ...config,
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = (await response.json()) as IData

        if (!signal.aborted) {
          setData(data)
        }
      } catch (error) {
        if (!signal.aborted && error instanceof Error) setError(error.message)
      } finally {
        if (!signal.aborted) {
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        }
      }
    }
    fetchData()

    return () => controller.abort()
  }, [url, config, update])

  return { data, loading, error, setUpdate, update }
}