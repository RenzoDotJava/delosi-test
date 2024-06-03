import { MetadataRoute } from 'next'
import { BASE_URL } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 1
    }
  ]
}