export const TagList = ({ tags }: { tags: { id: number; name: string }[] }) => (
  <ul>
    {tags.map((tag) => (
      <li key={tag.id}>#{tag.name}</li>
    ))}
  </ul>
);
