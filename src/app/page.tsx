'use client';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Learning Journal</h1>
        
        <div className="grid gap-6">
          {/* Sample blog post previews - you'll replace this with real data later */}
          <article className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href="/posts/first-post" className="hover:text-blue-600">
                My First Learning Experience
              </Link>
            </h2>
            <div className="text-gray-600 mb-4">Posted on March 15, 2024</div>
            <p className="text-gray-700">
              This is a preview of my first blog post where I share my learning journey...
            </p>
            <div className="mt-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #coding
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                #learning
              </span>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
} 