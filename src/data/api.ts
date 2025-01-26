import { env } from '@/env'

export async function api(path: string, init?: RequestInit) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
