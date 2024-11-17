export function getAssetPath(path: string): string {
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return `/${path}`
  }
  
  // In production, prepend the basePath
  return `/epass/${path}`
} 