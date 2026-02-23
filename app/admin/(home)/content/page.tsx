import { getAdminContents } from "@/function/get/admin";
import { formatContentsData } from "@/function/util/format";
import { FormattedContents } from "@/types/format";
import { redirect } from "next/navigation";
import AdminPageDataProvider from "../components/AdminPageDataProvider";
import AdminPaginationController from "../components/adminPaginationController/AdminPaginationController";
import AdminRowControllerContainer from "../components/adminRowControllerContainer/AdminRowControllerContainer";
import AdminRowList from "../components/adminRowList/AdminRowList";

const Content = async ({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) => {
  if (false) {
    redirect("/admin/login");
  }
  const { keyword } = await searchParams;
  const contentsData = await getAdminContents();

  const filteredItems = keyword?.trim()
    ? contentsData.items.filter((item) =>
        item.title?.toLowerCase().includes(keyword.toLowerCase())
      )
    : contentsData.items;
  const initialData = formatContentsData(filteredItems);

  return (
    <AdminPageDataProvider<FormattedContents[]> initialData={initialData}>
      <AdminRowControllerContainer />
      <AdminRowList<FormattedContents>
        keys={["URL", "BookISBN", "contentTitle", "BookName", "Memo", "Tag"]}
      ></AdminRowList>
      <AdminPaginationController />
    </AdminPageDataProvider>
  );
};

export default Content;
