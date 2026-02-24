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
        imageUrl="/images/mock/publisher.svg"
        publisherName="ㅁㄴㅇㄹㅁㄴㅇㄹㅁasdfasdfafdㄹㅇㄴ"
      />
      <h2 className="section-title mb-3 line-clamp-1 w-full px-[var(--client-layout-margin)]">의 서재</h2>
      <section className="grid size-full grid-cols-3 gap-[2px]">
        {[...new Array(30)].map((_item, index) => (
          <div className="relative aspect-[3/4]" key={index}>
            <Image
              alt="book1"
              src="/images/mock/book-grid.svg"
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
