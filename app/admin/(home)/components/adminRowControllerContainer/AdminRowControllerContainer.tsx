"use client";

import { useAdminPageData } from "@/app/admin/(home)/components/AdminPageDataProvider";
import AdminRowController from "./AdminRowController";

/**
 * 페이지 상태정보를 페이지에서 분리하고 필요한 정보를 AdminRowController에 전달하는 컨테이너
 */
const AdminRowControllerContainer = () => {
  const { selectRow, data } = useAdminPageData();
  const defaultValues = data instanceof Array && selectRow !== undefined && data[selectRow];

  return (
    <AdminRowController
      selectRow={selectRow}
      defaultValues={defaultValues}
      resultLength={Array.isArray(data) ? data.length.toLocaleString() : "0"} //실제로는 스토어에 저장한 결과길이가 아니라 백엔드에서 검색된 총 결과를 넣어야됨
    />
  );
};

export default AdminRowControllerContainer;
