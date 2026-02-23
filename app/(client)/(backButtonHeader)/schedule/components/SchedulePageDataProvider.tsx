"use client";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export enum ContentsFilterType {
  SOLO = "SOLO",
  TOGETHER = "TOGETHER",
}
type PageContextProps<T> = {
  data: T;
  alphabetFilter: string | undefined;
  setAlphabetFilter: Dispatch<SetStateAction<string | undefined>>;
  contentsfilter: ContentsFilterType[];
  setContentsFilter: Dispatch<SetStateAction<ContentsFilterType[]>>;
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
const SchedulePageDataProvider = <T,>({ children, initialData }: Props<T>) => {
  const [alphabetFilter, setAlphabetFilter] = useState<string>();
  const [contentsfilter, setContentsFilter] = useState<ContentsFilterType[]>([ContentsFilterType.SOLO]);
  return (
    <PageDataContext.Provider
      value={{ data: initialData, alphabetFilter, setAlphabetFilter, contentsfilter, setContentsFilter }}
    >
      {children}
    </PageDataContext.Provider>
  );
};

export default SchedulePageDataProvider;

export const useSchedulePageFilterControllerData = <T,>() => {
  const context = useContext(PageDataContext);
  if (context === undefined) {
    throw new Error("SchedulePageDataProvider 자식요소에서 사용해야 합니다.");
  }
  return {
    alphabetFilter: context.alphabetFilter,
    setAlphabetFilter: context.setAlphabetFilter,
    contentsfilter: context.contentsfilter,
    setContentsFilter: context.setContentsFilter,
  } as Omit<PageContextProps<T>, "data">;
};
