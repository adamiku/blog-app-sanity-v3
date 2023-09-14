"use client";

import { dataset, projectId } from "../env";

function onPublicAccessOnly() {
  throw new Error("Unable to load preview as you are not logged in");
}

if (!projectId || !dataset) {
  throw new Error(
    "Missing projectId or dataset. Check your sanity.json or .env"
  );
}

// export const usePreview =
