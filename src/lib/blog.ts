import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const blogsDirectory = path.join(process.cwd(), 'public/blogs')

export interface BlogPost {
  slug: string
  title: string
  description: string
  thumbnail: string
  content: string
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(blogsDirectory)
  
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(blogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        title: data.title || "Die häufigsten Fehler bei der Online-Erstellung eines Energieausweises",
        description: data.description || "Erfahren Sie, welche Fehler Sie bei der Erstellung Ihres Energieausweises vermeiden sollten.",
        thumbnail: `/images/${slug}.jpeg`,
        content
      }
    })

  return allPosts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark()
      .use(html)
      .process(content)
    
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || "Die häufigsten Fehler bei der Online-Erstellung eines Energieausweises",
      description: data.description || "Erfahren Sie, welche Fehler Sie bei der Erstellung Ihres Energieausweises vermeiden sollten.",
      thumbnail: `/images/${slug}.jpeg`,
      content: contentHtml,
    }
  } catch (error) {
    return null
  }
} 