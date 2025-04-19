// 📌:4-4
import { NewsItemPage, NewsItemPageProps } from "@/components/NewsItemPage";
import { getNewsItem, getNewsList } from "@/services/backend-api/news";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = NewsItemPageProps;

export const getStaticPaths: GetStaticPaths = async () => {
  const { newsList } = await getNewsList();
  const paths = newsList.map((item) => `/news/ssg/${item.slug}`);
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug;
  if (typeof slug !== "string") {
    throw new Error("invalid slug");
  }

  // slugをnumberに変換
  const slugNumber = Number(slug);
  if (isNaN(slugNumber)) {
    throw new Error("invalid slug number");
  }

  // newsItemを取得
  const newsItem = await getNewsItem(slugNumber);
  if (!newsItem) {
    return { notFound: true };
  }

  const accessedAt = new Date().toISOString(); // 日付の取得

  return {
    props: { newsItem, accessedAt, renderedAt: "ssg" },
  };
};

export default NewsItemPage;
