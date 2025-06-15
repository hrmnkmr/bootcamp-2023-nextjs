export const getAllTags = async () => {
  try {
    const res = await fetch("/api/tags");
    if (!res.ok) throw new Error("Failed to fetch tags");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch tags", e);
    return [];
  }
};

// 新しく追加する関数（タグ作成）
export const createTag = async (name: string) => {
  try {
    const res = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Failed to create tag");
    return await res.json(); // 作成されたタグオブジェクトを返す
  } catch (e) {
    console.error("タグ作成失敗", e);
    return null;
  }
};
