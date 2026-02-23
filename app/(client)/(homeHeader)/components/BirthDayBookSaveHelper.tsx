"use client";
import { CSVBook } from "@/types/api";
import { useEffect } from "react";

const BirthDayBookSaveHelper = ({ books }: { books: CSVBook[] }) => {
  // csv에서 읽은 정보를 빠르게 접근할수있도록 세션 스토리지에 저장(최대 5mb 저장가능함 주의!!)

  useEffect(() => {
    const saveSession = () => {
      //저장소가 비어있으면 새 정보로 저장
      if (sessionStorage.length < 1) {
        const bookArray: string[] = [];
        books.forEach((book, index) => {
          if (index < 6) sessionStorage.setItem(book.ISBN_THIRTEEN_NO, JSON.stringify(book));
          bookArray.push(book.ISBN_THIRTEEN_NO);
        });
        sessionStorage.setItem("ISBN", JSON.stringify(bookArray));
      }
    };
    try {
      let keyIndex = 0;
      if (sessionStorage.length > 1) {
        const key = sessionStorage.key(keyIndex);
        if (!key) throw new Error("키가 잘못됬습니다");
        if (key === "ISBN") keyIndex++;
        const value = sessionStorage.getItem(key);
        if (!value) throw new Error("값이 잘못되었습니다");
        const book: CSVBook = JSON.parse(value); //하나 골라서 날짜 체크
        const day = new Date(book.TWO_PBLICTE_DE).getDate();
        const month = new Date(book.TWO_PBLICTE_DE).getMonth();
        //날짜 체크후 불일치시 저장소 삭제
        if (day !== new Date().getDate() || month !== new Date().getMonth()) {
          sessionStorage.clear();
          throw new Error("저장소가 비어있습니다");
        }
      } else {
        throw new Error("저장소가 비어있습니다");
      }
    } catch (error: unknown) {
      saveSession();
      console.log(error);
    }
  }, [books]);
  return null;
};

export default BirthDayBookSaveHelper;
