import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getAdvice } from "./advice.server";

export const requestAdvice = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ situation: z.string().min(5).max(4000) }).parse(data))
  .handler(async ({ data }) => getAdvice(data.situation));
