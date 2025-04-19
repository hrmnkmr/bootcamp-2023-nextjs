// 📌:4-6
import { NewsItemPage, NewsItemPageProps } from "@/components/NewsItemPage";
import { getNewsItem } from "@/services/backend-api/news";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = NewsItemPageProps;

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug;
  if (typeof slug !== "string") {
    throw new Error("invalid slug");
  }

  const slugNumber = Number(slug);
  if (isNaN(slugNumber)) {
    return { notFound: true };
  }

  const newsItem = getNewsItem(slugNumber);

  if (!newsItem) {
    return { notFound: true };  // newsItemが見つからなかった場合
  }

  const accessedAt = new Date().toISOString();

  return {
    props: {
      newsItem,  // これでnewsItemが正しく渡される
      accessedAt,
      renderedAt: "ssg",  // SSRかSSGかに応じて
    },
  };
};




export default NewsItemPage;