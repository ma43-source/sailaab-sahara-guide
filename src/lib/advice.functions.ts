import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getAdvice } from "./advice.server";

export const requestAdvice = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        situation: z.string().min(5).max(4000),
        province: z.string().max(60).optional(),
        district: z.string().max(60).optional(),
        language: z.enum(["ur", "en"]).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => getAdvice(data));
