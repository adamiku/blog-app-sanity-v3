"use client";

import { Post } from "@/typings";
import { useLiveQuery } from "next-sanity/preview";
import BlogList from "./BlogList";

type Props = {
  posts: Post[];
  query: string;
};

function PreviewBlogList({ posts, query }: Props) {
  const [data] = useLiveQuery(posts, query);
  return <BlogList posts={data} />;
}

export default PreviewBlogList;
