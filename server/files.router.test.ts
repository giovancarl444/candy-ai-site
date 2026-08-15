import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("files router", () => {
  it("does not expose a file list without an authenticated user", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    await expect(caller.files.list()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
      message: "Please login (10001)",
    });
  });
});
