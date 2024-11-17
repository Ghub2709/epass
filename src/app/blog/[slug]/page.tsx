import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/blog'
import HeygenAvatar from '@/components/HeygenAvatar'
import BlogCTA from '@/components/blog/BlogCTA'
import { getAllBlogPosts } from '@/lib/blog'

// Add this function to generate all possible blog paths
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  // Helper function to safely split content
  const splitContent = (content: string, sections: string[]) => {
    let parts = [content];
    sections.forEach(section => {
      const newParts: string[] = [];
      parts.forEach(part => {
        const split = part.split(section);
        newParts.push(...split);
      });
      parts = newParts;
    });
    return parts;
  };

  // Split content into main sections
  const contentParts = splitContent(post.content, ['## 3', '## 6', '## 9']);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
            {/* First section */}
            <div 
              className="mb-12"
              dangerouslySetInnerHTML={{ 
                __html: contentParts[0] || ''
              }} 
            />

            <BlogCTA type="primary" />

            {/* Second section */}
            {contentParts[1] && (
              <div 
                className="mb-12"
                dangerouslySetInnerHTML={{ 
                  __html: contentParts[1]
                }} 
              />
            )}

            <BlogCTA type="secondary" />

            {/* Third section */}
            {contentParts[2] && (
              <div 
                className="mb-12"
                dangerouslySetInnerHTML={{ 
                  __html: contentParts[2]
                }} 
              />
            )}

            <BlogCTA type="chat" />

            {/* Final section */}
            {contentParts[3] && (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: contentParts[3]
                }} 
              />
            )}
          </article>
        </div>
      </section>

      <HeygenAvatar />
    </main>
  )
} 