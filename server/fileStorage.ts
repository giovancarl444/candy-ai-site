import { TRPCError } from "@trpc/server";

export const MAX_FILE_BYTES = 8 * 1024 * 1024;

const allowedContentTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
]);

export function isAllowedContentType(contentType: string) {
  return allowedContentTypes.has(contentType);
}

export function normalizeFileName(name: string) {
  const compact = name.trim().replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  return compact.slice(0, 180).replace(/^[-.]+/, "") || "upload";
}

export function decodeUpload(base64Data: string, expectedSize: number) {
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Data) || base64Data.length % 4 !== 0) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "The selected file could not be decoded." });
  }

  const bytes = Buffer.from(base64Data, "base64");
  if (bytes.length !== expectedSize) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "The file size did not match the uploaded content." });
  }
  if (bytes.length === 0 || bytes.length > MAX_FILE_BYTES) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Choose a file smaller than 8 MB." });
  }
  return bytes;
}

export function assertAllowedContentType(contentType: string) {
  if (!isAllowedContentType(contentType)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Supported formats are JPG, PNG, WEBP, PDF, and TXT." });
  }
}
