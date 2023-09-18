import { RichTextComponents } from "@/components/RichTextComponents";
import { formatDate } from "@/lib/formatDate";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { Post } from "@/typings";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const query = groq`
    *[_type=='post']
    {
        slug
    }`;
  const slugs: Post[] = await sanityFetch({ query });
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

export const revalidate = 30;

async function Post({ params: { slug } }: Props) {
  const query = groq`
    *[_type=='post' && slug.current == $slug][0]
    {
        ...,
        author->,
        categories[]->
    }
    `;
  const isDraftMode = draftMode().isEnabled;
  const post: Post = await sanityFetch<Post>({
    query,
    params: { slug },
    isDraftMode,
  });

  return (
    <article className="px-10 pb-28 text-white">
      <section className="space-y-2 border border-brandYellow">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              fill
            />
          </div>
        </div>
      </section>
      <section className="p-5 bg-brandYellow w-full">
        <div className="flex flex-col md:flex-row justify-between gap-y-5">
          <div className="">
            <h1 className="text-4xl font-extrabold">{post.title}</h1>
            <p>{formatDate(post._createdAt)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              className="rounded-full"
              src={urlForImage(post.author.image).url()}
              alt={post.author.name}
              width={40}
              height={40}
            />
            <div className="w-64">
              <h3 className="text-lg font-bold">{post.author.name}</h3>
              <div>{/* author bio */}</div>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="italic pt-10">{post.description}</h2>
          <div className="flex items-center justify-end mt-auto space-x-2">
            {post.categories.map((category) => (
              <p
                className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                key={category._id}
              >
                {category.title}
              </p>
            ))}
          </div>
        </div>
      </section>
      {/* <PortableBody body={post.body} /> */}
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
}

export default Post;
