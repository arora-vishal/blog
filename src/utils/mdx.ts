import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts');

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
    scope: data,
  });

  return {
    mdxSource,
    metadata: {
      ...data,
      slug: realSlug,
    } as PostMetadata,
  };
}

export async function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);
  const posts = await Promise.all(
    files
      .filter((path) => /\.mdx?$/.test(path))
      .map(async (fileName) => {
        const source = fs.readFileSync(path.join(POSTS_PATH, fileName), 'utf8');
        const { data } = matter(source);
        return {
          ...data,
          slug: fileName.replace(/\.mdx?$/, ''),
        } as PostMetadata;
      })
  );

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
} 