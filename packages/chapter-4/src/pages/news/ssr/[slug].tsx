// 📌:4-2
import { NewsItemPage, NewsItemPageProps } from "@/components/NewsItemPage";
import { getNewsItem } from "@/services/backend-api/news";
import { GetServerSideProps } from "next";

type Props = NewsItemPageProps;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const slug = query.slug;
  if (typeof slug !== "string") {
    throw new Error("invalid slug");
  }

  const slugNumber = Number(slug);
  if (isNaN(slugNumber)) {
    throw new Error("invalid slug number");
  }

  const newsItem = await getNewsItem(slugNumber);
  if (!newsItem) {
    return { notFound: true };
  }

  const accessedAt = new Date().toISOString();

  return {
    props: { newsItem, accessedAt, renderedAt: "ssr" },
  };
};

export default NewsItemPage;

