import { describe, expect, it } from "vitest";
import { decodeUpload, isAllowedContentType, MAX_FILE_BYTES, normalizeFileName } from "./fileStorage";

describe("file-storage validation", () => {
  it("normalizes names into safe storage path segments", () => {
    expect(normalizeFileName(" My file (final).PNG ")).toBe("My-file-final-.PNG");
    expect(normalizeFileName("../")).toBe("upload");
  });

  it("accepts allowed media and document content types", () => {
    expect(isAllowedContentType("image/png")).toBe(true);
    expect(isAllowedContentType("application/pdf")).toBe(true);
    expect(isAllowedContentType("application/octet-stream")).toBe(false);
  });

  it("decodes correctly sized upload content", () => {
    const base64 = Buffer.from("library asset").toString("base64");
    expect(decodeUpload(base64, 13).toString()).toBe("library asset");
  });

  it("rejects unexpected file sizes", () => {
    const base64 = Buffer.from("asset").toString("base64");
    expect(() => decodeUpload(base64, MAX_FILE_BYTES + 1)).toThrow();
  });
});
