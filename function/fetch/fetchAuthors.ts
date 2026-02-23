import { AuthorDto } from "@/types/dto";

export const fetchAuthors = async ({ pageParam }: { pageParam: number }) => {
  const limit = 6;
  const response = await fetch(`/api/authors?page=${pageParam}&limit=${limit}`);
  const data = await response.json();
  const items: AuthorDto[] = data.items || [];

  return {
    data: items,
    nextCursor: data.hasNext ? pageParam + 1 : undefined,
  };
};
