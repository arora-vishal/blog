import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/utils/mdx';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { mdxSource, metadata } = await getPostBySlug(params.slug);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <article className="prose lg:prose-xl">
          <h1>{metadata.title}</h1>
          <div className="text-gray-600 mb-4">Posted on {metadata.date}</div>
          <div className="mb-8">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                #{tag}
              </span>
            ))}
          </div>
          <MDXRemote source={mdxSource} />
        </article>
      </div>
    </main>
  );
} 