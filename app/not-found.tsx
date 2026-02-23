import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <body className="relative flex h-screen flex-col items-center justify-center gap-10 bg-[#ffffff]">
      <div className="flex flex-col items-center sm:flex-row sm:items-end">
        <Image
          src={"/images/BOOKY_404.png"}
          alt={"404_img"}
          width={256}
          height={240}
        />
        <div className="flex flex-col items-center gap-[18px] sm:items-start">
          <p className="font-['Inter'] text-6xl font-black text-[#5F69BE]">
            Oops!
          </p>
          <span className="text-center text-sm font-medium leading-[22px] text-[--sub-color] sm:text-left">
            페이지를 찾을 수 없습니다. <br />
            잘못된 경로이거나
            <br className=" sm:hidden" /> 페이지가 존재하지 않습니다.
          </span>
        </div>
      </div>
      <Link
        className="w-[328px] rounded-full bg-[#f8f8fe] py-6 text-center text-lg font-semibold text-[#5F69BE]"
        href={"/"}
      >
        홈 화면으로
      </Link>
    </body>
  );
}
