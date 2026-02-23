"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
type PageContextProps<T> = {
  data: T;
  selectRow: number | undefined;
  setSelectRow: Dispatch<SetStateAction<number | undefined>>;
  currentPage: number | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
const PageDataContext = createContext<PageContextProps<unknown> | undefined>(
  undefined
);
type Props<T> = {
  children?: ReactNode;
  initialData: T;
};
/**
 * 서버페이지가 요청한 값을 하위 클라이언트 컴포넌트에게 전달하기 위한 contextAPI
 *
 * 해당 프로바이더 사용시 제너릭 인터페이스 주입필요
 * @example <PageDataProvider<Interface> initialData={data}>
 */
const AdminPageDataProvider = <T,>({ children, initialData }: Props<T>) => {
  const [selectRow, setSelectRow] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <PageDataContext.Provider
      value={{
        data: initialData,
        selectRow,
        setSelectRow,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </PageDataContext.Provider>
  );
};

export default AdminPageDataProvider;

export const useAdminPageData = <T,>() => {
  const context = useContext(PageDataContext);
  if (context === undefined) {
    throw new Error("PageDataProvider 자식요소에서 사용해야 합니다.");
  }
  return context as PageContextProps<T>;
};
