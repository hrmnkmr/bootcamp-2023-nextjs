export const getAllTags = async (): Promise<{ id: number; name: string }[]> => {
  const res = await fetch("/api/tags");
  if (!res.ok) throw new Error("タグ取得失敗");
  return res.json();
};
