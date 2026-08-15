import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createStoredFile, getOwnedStoredFile, listStoredFiles, removeStoredFile } from "../db";
import { assertAllowedContentType, decodeUpload, MAX_FILE_BYTES, normalizeFileName } from "../fileStorage";
import { storagePut } from "../storage";
import { protectedProcedure, router } from "../_core/trpc";

const uploadInput = z.object({
  originalName: z.string().min(1).max(255),
  contentType: z.string().min(1).max(120),
  sizeBytes: z.number().int().positive().max(MAX_FILE_BYTES),
  base64Data: z.string().min(4).max(Math.ceil((MAX_FILE_BYTES * 4) / 3) + 4),
});

export const filesRouter = router({
  list: protectedProcedure.query(({ ctx }) => listStoredFiles(ctx.user.id)),
  upload: protectedProcedure.input(uploadInput).mutation(async ({ ctx, input }) => {
    assertAllowedContentType(input.contentType);
    const bytes = decodeUpload(input.base64Data, input.sizeBytes);
    const originalName = normalizeFileName(input.originalName);
    const { key, url } = await storagePut(`users/${ctx.user.id}/library/${originalName}`, bytes, input.contentType);

    return createStoredFile({
      ownerId: ctx.user.id,
      originalName,
      contentType: input.contentType,
      sizeBytes: input.sizeBytes,
      storageKey: key,
      storageUrl: url,
    });
  }),
  remove: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const file = await getOwnedStoredFile(input.id, ctx.user.id);
    if (!file) throw new TRPCError({ code: "NOT_FOUND", message: "This file is no longer available." });
    await removeStoredFile(file.id, ctx.user.id);
    return { success: true } as const;
  }),
});
