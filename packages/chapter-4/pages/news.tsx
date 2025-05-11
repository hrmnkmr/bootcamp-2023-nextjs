// pages/news.tsx
import type { GetStaticProps } from 'next';
import { getNewsList, NewsItem } from '../src/services/backend-api/news';

type Props = {
  newsList: NewsItem[];
};

export default function NewsPage({ newsList }: Props) {
  if (!Array.isArray(newsList)) {
    return <div>Error: Invalid newsList</div>;
  }

  return (
    <div>
      <h1>News List</h1>
      <ul>
        {newsList.map((news) => (
          <li key={news.slug}>
            {typeof news.sentence === 'string' ? (
              <h2>{news.sentence}</h2>
            ) : (
              <div>[JSX要素のようなものが含まれている]</div>
            )}
            <p>{news.publishedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const { newsList = [], accessedAt } = await getNewsList();

  return {
    props: {
      newsList,
      accessedAt,
    },
  };
};


