import { gssp } from "@/lib/next/gssp";
import { prisma } from "@/prisma";
import Link from "next/link";
import { useState } from "react";
import { Prisma } from "@prisma/client";

type PostWithTags = Prisma.PostGetPayload<{ include: { tags: true } }>;
type Tag = { id: number; name: string };

type Props = {
  posts: PostWithTags[];
  tags: Tag[]; // ← 追加
};

const Page = ({ posts, tags }: Props) => {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  const filteredPosts = selectedTagId
    ? posts.filter((post) =>
        post.tags.some((tag) => tag.id === selectedTagId)
      )
    : posts;

  return (
    <div>
      <h1>記事一覧</h1>

      {/* タグボタン表示 */}
      <div>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedTagId(tag.id)}
            style={{ marginRight: 8 }}
          >
            {tag.name}
          </button>
        ))}
        <button onClick={() => setSelectedTagId(null)}>すべて表示</button>
      </div>

      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// SSR で posts と tags を取得
export const getServerSideProps = gssp<Props>(async () => {
  const [posts, tags] = await Promise.all([
    prisma.post.findMany({ include: { tags: true } }),
    prisma.tag.findMany(), // ← タグ一覧取得を追加
  ]);

  return { props: { posts, tags } };
});

export default Page;
