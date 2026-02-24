import { Detail } from "@/types/dto";
import { BACKEND_URL } from "@/function/config";
import { useQuery } from "@tanstack/react-query";

const useGetBooksByIsbn = (isbn: number) => {
  const { data, status } = useQuery({ queryKey: ["isbn", isbn], queryFn: () => fetchBooksByIsbn(isbn) });
  return { data, status };
};

export default useGetBooksByIsbn;

const fetchBooksByIsbn = async (isbn: number): Promise<Detail> => {
  const response = await fetch(BACKEND_URL + "/book/" + isbn);
  if (response.ok) {
    const result: Detail = await response.json();
    return result;
  }
  throw new Error(response.statusText);
};