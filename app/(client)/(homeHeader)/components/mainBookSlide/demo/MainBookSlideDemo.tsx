"use client";
import { CSVBook } from "@/types/api";
import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactConfetti from "react-confetti";
import BookDescription from "../BookDescription";
import MainBookSlideContainerDemo from "./MainBookSlideContainerDemo";

type Props = {
  className?: string;
  books: CSVBook[];
} & HTMLAttributes<HTMLDivElement>;
const MainBookSlideDemo = ({ className, books, ...props }: Readonly<Props>) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [confettiWind, setConfettiWind] = useState<number>(0);

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
      <ReactConfetti
        width={size.width}
        height={size.height}
        wind={confettiWind}
        gravity={0.08}
        friction={0.96}
        numberOfPieces={size.width / 25}
        drawShape={drawShape}
        frameRate={60}
        style={{ zIndex: 0, display: "absolute" }}
      />
      <BookDescription
        createdAt={new Date()}
        className="z-10 px-[var(--client-layout-margin)]"
      />
      <MainBookSlideContainerDemo
        books={books.slice(0, 6)}
        setConfettiWind={setConfettiWind}
      />
    </section>
  );
};

export default MainBookSlideDemo;

const drawShape = (ctx: CanvasRenderingContext2D) => {
  const path = new Path2D(
    "M37 2L23 0C23.8 7.2 13.3333 12.3333 8 14C10.5 16.5 17.6 20.9 26 18.5C34.4 16.1 36.8333 6.5 37 2Z"
  );
  ctx.save();
  ctx.fill(path);
  ctx.restore();
};
