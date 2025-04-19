export type NewsItem = {
  publishedAt: string;
  slug: string;
  sentence: string;
  body: string;
};

export type NewsList = NewsItem[];

export async function getNewsList(): Promise<{
  newsList: NewsList;
  accessedAt: string;
}> {
  const res = await fetch(`${process.env.BACKEND_API_HOST}/api/news`);
  const data = await res.json();

  console.log('🎯 getNewsList() のレスポンス:', data);

  for (const item of data.newsList) {
    if (typeof item.sentence !== 'string') {
      console.warn('⚠️ sentence に JSX のようなオブジェクトが入っています:', item.sentence);
    }
  }

  return data;
}

