import Image from "next/image";
import NotReady from "../components/exploreHeader/NotReady";

const Placepage = () => {
  return (
    <div className="absolute top-0 min-h-screen w-full overflow-hidden">
      <Image
        fill
        src={"/images/공간.png"}
        alt={"공간이미지"}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-[120px] flex w-full justify-center px-5">
        <NotReady />
      </div>
    </div>
  );
};

export default Placepage;
