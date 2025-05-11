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

  return {
    newsList: Array.isArray(data) ? data : [],
    accessedAt: new Date().toISOString()
  };
}



