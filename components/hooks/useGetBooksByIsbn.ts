import { Detail } from "@/types/dto";
import { useQuery } from "@tanstack/react-query";

const useGetBooksByIsbn = (isbn: number) => {
  const { data, status } = useQuery({ queryKey: ["isbn", isbn], queryFn: () => fetchBooksByIsbn(isbn) });
  return { data, status };
};

export default useGetBooksByIsbn;

const fetchBooksByIsbn = async (isbn: number): Promise<Detail> => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/book/" + isbn);
  if (response.ok) {
    const result: Detail = await response.json();
    return result;
  }
  throw new Error(response.statusText);
};