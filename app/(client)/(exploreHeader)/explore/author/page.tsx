import Image from "next/image";
import NotReady from "../components/exploreHeader/NotReady";

const AuthorPage = () => {
  return (
    // <main className="relative flex size-full flex-col items-center">
    //   <Suspense fallback={<LoadingSpinner className="h-[50vh] w-full" />}>
    //     <AuthorGridContainer />
    //   </Suspense>
    // </main>
    <div className="absolute top-0 w-full" style={{ height: "calc(100vh)" }}>
      <Image
        fill
        src="/images/작가.png"
        alt="작가이미지"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-[120px] flex w-full justify-center px-5">
        <NotReady />
      </div>
    </div>
  );
};

export default AuthorPage;
