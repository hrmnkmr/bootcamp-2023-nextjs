import { useEffect, useState } from "react";
import { TagSelector } from "@/components/TagSelector";
import { getAllTags } from "@/services/client/tag";

const Page = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    getAllTags()
      .then((data) => setTags(data ?? []))
      .catch(() => setTags([]));
  }, []);

  return (
    <div>
      <TagSelector
        tags={tags}  // ここを追加
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </div>
  );
};

export default Page;
