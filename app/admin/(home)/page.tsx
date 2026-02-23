import { redirect } from "next/navigation";

const AdminHome = () => {
  if (false) {
    //서버에서 권한 인증 통신에 성공하지 못한경우 리다이렉트
    redirect("/admin/login");
  } else {
    //이 라우터는 content 리다이렉트 시켜주기 위한 라우터
    redirect("/admin/publisher");
  }
};

export default AdminHome;
