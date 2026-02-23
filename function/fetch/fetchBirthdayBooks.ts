import { PageResponseBookDto } from "@/types/dto";

const fetchBirthdayBooks = async (): Promise<
  PageResponseBookDto | undefined
> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/books?keyword=string&page=0&limit=10&orderBy=publishedDate&direction=desc",
      {
        next: { revalidate: 86400, tags: ["daily-discovery"] },
      }
    );
    if (response.ok) {
      const result: PageResponseBookDto = await response.json();
      return {
        items: result.items,
        hasNext: result.hasNext,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
        hasPrevious: result.hasPrevious,
      };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchBirthdayBooks;

// type fetchBirthdayBooksParams = {
//   keyword: "string";
//   page: 0;
//   limit: 10;
//   orderBy: "publishedDate";
//   direction: "desc";
// };

// 기존 페칭 문법

// const fetchInfiniteCsvData = async ({ pageParam }: { pageParam: number }) => {
//   const allIsbns: string[] = JSON.parse(sessionStorage.getItem("ISBN") || "[]");
//   const isbns = allIsbns.slice(pageParam, pageParam + 6);
//   const response = await fetch("/api/book?" + isbns.map((isbn) => `isbn=${isbn}`).join("&"));
//   const data = await response.json();
//   const keys = Object.keys(data.data);
//   const parseData: CSVBook[] = keys.map((key) => data.data[key]);

//   const hasNextPage = pageParam + 6 < allIsbns.length;
//   return {
//     data: parseData,
//     nextCursor: hasNextPage ? pageParam + 6 : undefined,
//   };
// };
