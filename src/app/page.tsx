'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/utils/mdx';
import type { PostMetadata } from '@/utils/mdx';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase();
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = post.description.toLowerCase().includes(searchTerm);
      const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      return titleMatch || descriptionMatch || tagsMatch;
    });
    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Learning Journal</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <p className="text-gray-600">No posts found matching your search.</p>
          ) : (
            filteredPosts.map((post: PostMetadata) => (
              <article key={post.slug} className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <div className="text-gray-600 mb-4">Posted on {post.date}</div>
                <p className="text-gray-700">
                  {post.description}
                </p>
                <div className="mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 