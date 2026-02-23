"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { useEffect, useState } from "react";
import ShareIcon from "@/public/icons/shareIcon.svg";
import KakaoInfoTip from "@/components/kakaoInfoTip/KakaoInfoTip";
import { Book } from "@/types/api";

type Props = { isbn: number; bookData: Book | undefined };
const BookHeaderHelper = ({ isbn, bookData }: Readonly<Props>) => {
  const { setTitle, setEtcButton } = useBackHeader();
  const [bookNameState, setBookNameState] = useState(bookData?.title || "");
  useEffect(() => {
    //카카오 검색데이터 없을시 세션 스토리지에서 제목을 가져옴
    if (!bookData?.title) {
      const bookName = sessionStorage.getItem(isbn.toString());
      if (bookName) {
        setBookNameState(JSON.parse(bookName).TITLE_NM);
      }
    }
  }, [bookData, isbn]);

  useEffect(() => {
    if (typeof bookNameState !== "string") return;
    setTitle(
      <h1 className="flex max-w-[50vw] flex-row items-center justify-start text-lg font-semibold lg:max-w-[40vw]">
        <span className="truncate">{bookNameState}</span>
        {bookData?.isbn && <KakaoInfoTip />}
      </h1>
    );

    const sharedHandler = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "HBD 책 소개",
            text: bookNameState,
            url: window.location.href,
          })
          .then(() => console.log("공유 성공"))
          .catch((error) => console.log("공유 실패", error));
      } else {
        alert("죄송합니다 현재 브라우저가 Web Share API를 지원하지 않습니다.");
      }
    };
    setEtcButton(<ShareIcon className="text-[var(--sub-color)]" onClick={sharedHandler} />);
    return () => {
      setTitle("");
      setEtcButton(null);
    };
  }, [setTitle, setEtcButton, bookNameState, bookData]);
  return null;
};

export default BookHeaderHelper;
