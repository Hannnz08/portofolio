import { MetadataRoute } from 'next';
import { site } from '@/data/content';

// Sitemap sederhana untuk SEO
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
