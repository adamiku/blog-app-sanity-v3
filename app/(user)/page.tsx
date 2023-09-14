import BlogList from "@/components/BlogList";
import PreviewBlogList from "@/components/PreviewBlogList";
import PreviewProvider from "@/components/PreviewProvider";
import { sanityFetch, token } from "@/sanity/lib/fetch";
import { Post } from "@/typings";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";

const query = groq`
*[_type=='post'] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;

export default async function Home() {
  const posts = await sanityFetch<Post[]>({ query });
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewBlogList posts={posts} query={query} />
      </PreviewProvider>
    );
  }
  return <BlogList posts={posts} />;
}
