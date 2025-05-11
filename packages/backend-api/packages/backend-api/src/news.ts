export type NewsItem = {
  publishedAt: string;
  slug: string;
  sentence: string;
  body: string;
};

export type NewsList = NewsItem[];

// ダミーのニュースデータ
export const newsList: NewsList = [
  {
    publishedAt: "2024-04-18T00:00:00.000Z",
    slug: "example-news",
    sentence: "これはダミーのニュースです。",
    body: "これはダミーのニュースの本文です。",
  },
];

export function getNewsItem(id: number): NewsItem | undefined {
  return newsList[id];
}