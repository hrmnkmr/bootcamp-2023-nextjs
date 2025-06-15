import { z } from "zod";

export const createPostInputSchema = z.object({
  title: z.string(),
  // ✏️ ①
  content: z
    .string()
    .min(1, "本文は必須です")
    .max(128, "本文は128文字以内で入力してください"),
    tagIds: z.array(z.number()).optional(),  // 追加
});

export const updatePostInputSchema = z.object({
  title: z.string(),
  // ✏️ ②
  content: z
    .string()
    .max(128, "本文は128文字以内で入力してください")
    .optional(),
});

export type CreatePostInputSchemaType = z.infer<typeof createPostInputSchema>;
export type UpdatePostInputSchemaType = z.infer<typeof updatePostInputSchema>;
