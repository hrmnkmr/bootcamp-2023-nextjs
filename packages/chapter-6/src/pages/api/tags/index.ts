import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// タグ作成用スキーマ
const createTagSchema = z.object({
  name: z.string().min(1, "タグ名は必須です"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // タグ一覧取得
    try {
      const tags = await prisma.tag.findMany();
      res.status(200).json(tags);
    } catch (error) {
      console.error("タグ取得エラー:", error);
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  }

  else if (req.method === "POST") {
    // タグ作成処理
    try {
      const { name } = createTagSchema.parse(req.body);
      const newTag = await prisma.tag.create({ data: { name } });
      res.status(201).json(newTag);
    } catch (error) {
      console.error("タグ作成エラー:", error);
      res.status(400).json({ message: "Failed to create tag" });
    }
  }

  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
