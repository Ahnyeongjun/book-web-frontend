import { EventDto } from "@/types/dto";
import { redirect } from "next/navigation";
import AdminPageDataProvider from "../components/AdminPageDataProvider";
import AdminPaginationController from "../components/adminPaginationController/AdminPaginationController";
import AdminRowControllerContainer from "../components/adminRowControllerContainer/AdminRowControllerContainer";
import AdminRowList from "../components/adminRowList/AdminRowList";

const Event = async ({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) => {
  if (false) {
    //서버에서 권한 인증 통신에 성공하지 못한경우 리다이렉트
    redirect("/admin/login");
  }
  const { keyword } = await searchParams;
  console.log("searchParams 테스트", keyword);

  return (
    <AdminPageDataProvider<EventDto[]>
      initialData={[
        {
          urls: [{ url: "asdassdfasdf", type: "Link" }],
          title: "test",
          host: "test",
          eventType: "test",
          id: 0,
          creator: {
            id: 1,
            name: "관리자",
            bookIsbnList: [0, 1],
          },
          location: "ONLINE",
          startDate: "",
          endDate: "",
          eventFlag: "SOLO",
          books: [],
          tags: [],
        },
      ]}
    >
      <AdminRowControllerContainer />
      <AdminRowList<EventDto>
        keys={[
          "isbn",
          "title",
          "publishedDate",
          "detailUrl",
          "translator",
          "price",
          "authorNameList",
          "publisherId",
        ]}
      ></AdminRowList>
      <AdminPaginationController />
    </AdminPageDataProvider>
  );
};

export default Event;
