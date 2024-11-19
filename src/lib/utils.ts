export const getAssetPath = (path: string) => {
  // Remove '/epass' from the path when using custom domain
  return path.startsWith('/') ? path : `/${path}`
} 