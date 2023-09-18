import "server-only";

import type { QueryParams } from "@sanity/client";

import { client } from "./client";

export const token = process.env.SANITY_API_READ_TOKEN;

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
  isDraftMode = false,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  isDraftMode?: boolean;
}): Promise<QueryResponse> {
  if (isDraftMode && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required."
    );
  }

  return client.fetch<QueryResponse>(query, params, {
    // cache: "force-cache",
    ...(isDraftMode && {
      cache: undefined,
      token: token,
      perspective: "previewDrafts",
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  });
}
