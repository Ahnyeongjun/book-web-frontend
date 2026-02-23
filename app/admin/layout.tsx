import PopupProvider from "@/components/popupProvider/PopupProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import "../globals.css";

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <body
      className={`relative mx-auto flex h-full min-h-screen w-screen flex-col bg-white antialiased`}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="relative mx-auto flex size-full flex-1 flex-col">
        {children}
      </div>
      <PopupProvider />
    </body>
  );
};
export default AdminLayout;
