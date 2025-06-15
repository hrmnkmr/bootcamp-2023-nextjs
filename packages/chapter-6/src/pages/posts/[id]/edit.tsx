import { ErrorMessage } from "@/components/ErrorMessage";
import { TagSelector } from "@/components/TagSelector";
import { gssp } from "@/lib/next/gssp";
import { updatePostInputSchema, UpdatePostInputSchemaType } from "@/lib/zod";
import { prisma, Post } from "@/prisma";
import { updatePost } from "@/services/client/posts";
import { getAllTags } from "@/services/client/tag";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  post: Post & { tags: { id: number; name: string }[] };
};

const Page = ({ post }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>(
    post.tags.map((t) => t.id)
  );

  const defaultValues = {
    title: post.title,
    content: post.content ?? undefined,
  };

  const { handleSubmit, register, formState } = useForm<UpdatePostInputSchemaType>({
    defaultValues,
    resolver: zodResolver(updatePostInputSchema),
  });

  useEffect(() => {
    getAllTags().then(setTags).catch(() => setTags([]));
  }, []);

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const { data, err } = await updatePost(values, post.id);
        if (err) {
          setError(err.message);
          return;
        }

        await fetch(`/api/posts/${post.id}/tags`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tagIds: selectedTags }),
        });

        router.push(`/posts/${data.id}`);
      })}
    >
      <fieldset style={{ padding: "16px" }}>
        <legend>記事を編集する</legend>
        <div>
          <label>
            title:
            <input type="text" {...register("title")} />
            <ErrorMessage message={formState.errors.title?.message} />
          </label>
        </div>
        <div>
          <label>
            content:
            <textarea {...register("content")} />
            <ErrorMessage message={formState.errors.content?.message} />
          </label>
        </div>
        <TagSelector
          tags={tags}
          selectedTags={selectedTags}          // correct prop name
          setSelectedTags={setSelectedTags}    // correct prop name
        />
      </fieldset>
      <hr />
      <button>submit</button>
      <ErrorMessage message={error} />
      <hr />
      <Link href="/">Back to Top</Link>
    </form>
  );
};

export const getServerSideProps = gssp<Props>(async ({ query }) => {
  const { id } = z.object({ id: z.coerce.number() }).parse(query);
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true },
  });
  if (!post) return { notFound: true };
  return { props: { post } };
});

export default Page;
