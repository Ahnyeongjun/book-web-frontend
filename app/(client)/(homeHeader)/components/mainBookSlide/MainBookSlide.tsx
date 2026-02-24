"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getBirthdayBooks } from "@/function/get/client";
import { useQuery } from "@tanstack/react-query";
import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BookDescription from "./BookDescription";
import InteractiveConfetti from "./InteractiveConfetti";
import MainBookSlideContainer from "./MainBookSlideContainer";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const MainBookSlide = ({ className, ...props }: Readonly<Props>) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [confettiWind, setConfettiWind] = useState<number>(0);
  const [, month, day] = new Date().toISOString().split("T")[0].split("-");

  const { data } = useQuery({
    queryKey: ["today"],
    queryFn: () => getBirthdayBooks(month, day),
  });

  //전체 크기 조정용
  useLayoutEffect(() => {
    const sectionUpdateSize = () => {
      if (sectionRef.current) {
        setSize({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight,
        });
      }
    };
    sectionUpdateSize();
    window.addEventListener("resize", sectionUpdateSize);
    return () => window.removeEventListener("resize", sectionUpdateSize);
  }, []);

  //콘페티 이벡트 바람 조정
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiWind(0);
    }, 2000);
    return () => clearTimeout(timer);
  }, [confettiWind]);

  return (
    <section
      className={`flex size-full flex-col ${className || ""}`}
      {...props}
      ref={sectionRef}
    >
      <InteractiveConfetti
        width={size.width}
        height={size.height}
        wind={confettiWind}
        numberOfPieces={Math.floor(size.width / 25)}
      />
      <BookDescription
        createdAt={new Date()}
        className="z-10 px-[var(--client-layout-margin)]"
      />
      {data?.items ? (
        <MainBookSlideContainer
          books={data.items}
          setConfettiWind={setConfettiWind}
        />
      ) : (
        <LoadingSpinner className="h-[30vw] w-full" />
      )}
    </section>
  );
};

export default MainBookSlide;
