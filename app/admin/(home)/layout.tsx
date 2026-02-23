import SuccessToast from "@/components/popupProvider/SuccessToast";
import { ReactNode } from "react";
import AdminHeader from "./components/adminHeader/AdminHeader";
import AdminSideNav from "./components/adminSideNav/AdminSideNav";

const AdminHomeLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="relative flex flex-1 flex-col">
      <AdminHeader />
      <div className="relative flex flex-1 flex-row overflow-hidden">
        <AdminSideNav />
        <div className="relative mr-5 flex flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
      <SuccessToast />
    </div>
  );
};
export default AdminHomeLayout;
