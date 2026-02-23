"use client";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export enum ContentsFilterType {
  All,
  YOUTUBE,
  ARTICLE,
  PODCAST,
}
type PageContextProps<T> = {
  data: T;
  contentsfilter: ContentsFilterType;
  setContentsFilter: Dispatch<SetStateAction<ContentsFilterType>>;
};
const PageDataContext = createContext<PageContextProps<unknown> | undefined>(undefined);
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
const DiscoveryPageDataProvider = <T,>({ children, initialData }: Props<T>) => {
  const [contentsfilter, setContentsFilter] = useState<ContentsFilterType>(ContentsFilterType.All);
  return (
    <PageDataContext.Provider value={{ data: initialData, contentsfilter, setContentsFilter }}>
      {children}
    </PageDataContext.Provider>
  );
};

export default DiscoveryPageDataProvider;

export const useDiscoveryPageFilterControllerData = <T,>() => {
  const context = useContext(PageDataContext);
  if (context === undefined) {
    throw new Error("DiscoveryPageDataProvider 자식요소에서 사용해야 합니다.");
  }
  return {
    contentsfilter: context.contentsfilter,
    setContentsFilter: context.setContentsFilter,
  } as Omit<PageContextProps<T>, "data">;
};
