import AdminPageDataProvider from "@/app/admin/(home)/components/AdminPageDataProvider";
import AdminPaginationController from "@/app/admin/(home)/components/adminPaginationController/AdminPaginationController";
import AdminRowList from "@/app/admin/(home)/components/adminRowList/AdminRowList";
import { getAdminPublishers } from "@/function/get/admin";
import { formatPublisherData } from "@/function/util/format";
import { FormattedPublisher } from "@/types/format";
import { redirect } from "next/navigation";
import AdminRowControllerContainer from "../components/adminRowControllerContainer/AdminRowControllerContainer";

const Publisher = async ({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) => {
  if (false) {
    //서버에서 권한 인증 통신에 성공하지 못한경우 리다이렉트
    redirect("/admin/login");
  }
  const publisherData = await getAdminPublishers();
  const { keyword } = await searchParams;
  const filteredItems = keyword?.trim()
    ? publisherData.items.filter((item) =>
        item.name?.toLowerCase().includes(keyword.toLowerCase())
      )
    : publisherData.items;
  const initialData = formatPublisherData(filteredItems);

  return (
    <AdminPageDataProvider<FormattedPublisher[]> initialData={initialData}>
      <AdminRowControllerContainer />
      <AdminRowList<FormattedPublisher>
        keys={[
          "PublisherName",
          "InstagramID",
          "LogoLink",
          "URL",
          "URLType",
          "BookISBN",
          "Memo",
          "Tag",
        ]}
      ></AdminRowList>
      <AdminPaginationController />
    </AdminPageDataProvider>
  );
};

export default Publisher;
