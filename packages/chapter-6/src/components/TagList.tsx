// src/components/TagList.tsx

type Tag = {
  id: number;
  name: string;
};

type Props = {
  tags: Tag[];
};

export default function TagList({ tags }: Props) {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag.id}>{tag.name}</li>
      ))}
    </ul>
  );
}
