import PublisherProfile from "@/components/publisherProfile/PublisherProfile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PublisherPage = async ({ params }: { params: Promise<{ publisherId: string }> }) => {
  const { publisherId } = await params;
  console.log(publisherId);
  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      <PublisherProfile
        className="mb-10 px-[var(--client-layout-margin)]"
        imageUrl={
          "https://s3-alpha-sig.figma.com/img/d0e2/5bb2/de40eee98c72f7a09314e260baa500a0?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iPBj-JFOKN~02lRr3C1SoNM0vmqmoWgGQ~~HO8V6F80ok2YjsJr4oD-nFnZQWTdo2vS5cY-r5WxRQDCTF5B~fxukoXy7mRvq-JudRbf8fWsfak2NJ0yeGXO5MOQMfVgP46GTmJjw98fBdNUZFoQuH103lzBgcdYGOtKRddg9CckUF5~WQqPo7ivrKl7RG0gCdMKkIDAI~JaLH3kGGiT0xAE~TMZs373K9qiuC6zzweO9KgSar5DddyMvIinPT1182v-nCt0Xrv6EUQ0MKWtkAQdji09S3Swg0f9X965u9lUB34osEJyHlYgjvPe6iviTMjbf-4~H0sMyTaQXzB5l0w__"
        }
        publisherName="ㅁㄴㅇㄹㅁㄴㅇㄹㅁasdfasdfafdㄹㅇㄴ"
      />
      <h2 className="section-title mb-3 line-clamp-1 w-full px-[var(--client-layout-margin)]">의 서재</h2>
      <section className="grid size-full grid-cols-3 gap-[2px]">
        {[...new Array(30)].map((_item, index) => (
          <div className="relative aspect-[3/4]" key={index}>
            <Image
              alt="book1"
              src={
                "https://s3-alpha-sig.figma.com/img/6968/9fe6/099879556d8a4fa78e4f47da472f3ccc?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HQcGkXZrBMQ779zQA~pNtlBd33YvK2GWEruzd6pQycZzoCfdabiIGFjDewMOh4vZbflS3YoMDVWR16oxTEuBTZuNgJjUwAPx5wcPoJXwAnu7MYlE0hjtbtHDU3itTWkxFOJGxncsNUtSY84s28DxL-9spzucL22Fp0ozeVDKNF80fggYw5dx4OTUV91Z8-CYoHP~2IpyVHImk1-8CN0-a8wNxLvyWa16LEC1lU7p4htURKObS2T5wU54ciqxVOMFnbDLCxRZX~rH3DEn77atDiE0DnEi9o7nHbR2NY86Q3Na~tH7C4cXvYd6ZLV8fsoMMsT~Lj~Xm0Oor0nvK6wfsA__"
              }
              fill
            ></Image>
          </div>
        ))}
      </section>
      <Link
        href={"/search?query=" + encodeURIComponent(publisherId)}
        className="fixed bottom-[13vh] flex h-fit items-center rounded-full bg-[#FFFFFFD9] px-6 py-2 text-sm text-[var(--sub-color)] shadow-[0_0_var(--client-layout-margin)_rgba(0,0,0,0.12)] backdrop-blur-[5px]"
      >
        의 책 더보기
      </Link>
    </main>
  );
};

export default PublisherPage;
