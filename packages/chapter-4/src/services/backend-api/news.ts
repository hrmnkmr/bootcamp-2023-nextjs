export type NewsItem = {
  publishedAt: string;
  slug: string;
  sentence: string;
  body: string;
};

export type NewsList = NewsItem[];

// API から取得する関数（今回は未使用だけど置いておく）
export async function getNewsList(): Promise<{
  newsList: NewsList;
  accessedAt: string;
}> {
  const res = await fetch(`${process.env.BACKEND_API_HOST}/api/news`);
  const data = await res.json();

  console.log("🎯 getNewsList() のレスポンス:", data);

  for (const item of data.newsList) {
    if (typeof item.sentence !== "string") {
      console.warn(
        "⚠️ sentence に JSX のようなオブジェクトが入っています:",
        item.sentence
      );
    }
  }

  return data;
}

// 🔽 これが index.ts に必要なやつ 🔽
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
