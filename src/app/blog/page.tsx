import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'

export default async function BlogOverview() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unser Blog
          </h1>
          <p className="text-xl text-gray-300">
            Expertenwissen rund um den Energieausweis
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 