import Image from "next/image";
import NotReady from "../components/exploreHeader/NotReady";

const Readerpage = () => {
  return (
    <div className="absolute top-0 w-full" style={{ height: "calc(100vh)" }}>
      <Image
        fill
        src="/images/독자.png"
        alt="독자이미지"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-[120px] flex w-full justify-center px-5">
        <NotReady />
      </div>
    </div>
  );
};

export default Readerpage;
