// src/pages/posts/[id].tsx
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TagList } from "@/components/TagList";

type Props = {
  post: {
    id: number;
    title: string;
    content: string;
    tags: { id: number; name: string }[];
  } | null;
};

const PostDetailPage = ({ post }: Props) => {
  const router = useRouter();

  if (!post) return <p>記事が見つかりません</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* タグの表示 */}
      <TagList tags={post.tags} />

      <hr />

      <Link href={`/posts/${post.id}/edit`} legacyBehavior>
        <a>この投稿を編集</a>
      </Link>
      <br />
      <Link href="/" legacyBehavior>
        <a>トップへ戻る</a>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  if (isNaN(id)) return { props: { post: null } };

  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true }, // タグを一括取得
  });

  return {
    props: { post },
  };
};

export default PostDetailPage;
