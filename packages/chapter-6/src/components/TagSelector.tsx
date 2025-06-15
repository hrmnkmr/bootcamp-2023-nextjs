import React from "react";

type TagSelectorProps = {
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
  tags: { id: number; name: string }[]; // タグ一覧も渡す場合
};

export const TagSelector = ({ selectedTags, setSelectedTags, tags }: TagSelectorProps) => {
  return (
    <div>
      {tags.map((tag) => (
        <label key={tag.id}>
          <input
            type="checkbox"
            value={tag.id}
            checked={selectedTags.includes(tag.id)}
            onChange={(e) => {
              const id = Number(e.target.value);
              if (e.target.checked) {
                setSelectedTags([...selectedTags, id]);
              } else {
                setSelectedTags(selectedTags.filter((tid) => tid !== id));
              }
            }}
          />
          {tag.name}
        </label>
      ))}
    </div>
  );
};
