import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = Number(req.query.id);

  if (req.method === "PATCH") {
    const { tagIds } = req.body;
    if (!Array.isArray(tagIds)) return res.status(400).json({ message: "Invalid tagIds" });

    try {
      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          tags: {
            set: tagIds.map((id: number) => ({ id })),
          },
        },
        include: { tags: true },
      });

      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ message: "Failed to update tags" });
    }
  }

  res.setHeader("Allow", ["PATCH"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
