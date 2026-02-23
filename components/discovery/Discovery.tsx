import fetchDailyDiscovery from "@/function/fetch/fetchDailyDiscovery";
import { ContentsType } from "@/types/dto";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import CommonPillButton from "../common/CommonPillButton";
import EmptyImage from "../common/EmptyImage";
import DiscoveryItem from "./DiscoveryItem";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;

const Discovery = async ({ className, ...props }: Readonly<Props>) => {
  const dailyDiscoveryData = await fetchDailyDiscovery();
  const hasDiscovery = dailyDiscoveryData && dailyDiscoveryData.length > 0;

  return (
    <section
      className={`relative h-fit w-full px-[var(--client-layout-margin)] py-[var(--content-section-margin)] ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative flex size-full flex-col items-center justify-between">
        <div className="relative flex size-full flex-col items-start justify-center">
          <h2 className="section-title mb-1">디스커버리</h2>
          <p className="section-sub-title mb-4">
            좋은 책을 발견하는 새로운 관점
          </p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          {hasDiscovery && dailyDiscoveryData[0].image ? (
            <Image
              alt="discovery"
              src={dailyDiscoveryData[0].image}
              fill
              sizes="768px"
            />
          ) : (
            <EmptyImage />
          )}
        </div>
      </div>
      {hasDiscovery ? (
        <ul>
          {dailyDiscoveryData.map(
            (item, index) =>
              index > 0 &&
              index < 4 && (
                <React.Fragment key={item.id}>
                  <DiscoveryItem
                    contentType={
                      item.urls && index < item.urls.length
                        ? ContentsType[item.urls[index].type] || "기타"
                        : "기타"
                    }
                    title={item.title || ""}
                    imageUrl={item.image}
                  />
                  {index < 3 && <div className="border-b" />}
                </React.Fragment>
              )
          )}
        </ul>
      ) : (
        <p className="mt-6 text-center text-gray-500">
          오늘의 디스커버리 콘텐츠가 없습니다.
        </p>
      )}
      <div className="relative mt-4 flex w-full justify-center">
        <Link href={"/discovery"}>
          <CommonPillButton className="!size-fit border border-gray-200 bg-white px-4 text-[var(--sub-color)]">
            컨텐츠 더보기
          </CommonPillButton>
        </Link>
      </div>
    </section>
  );
};
export default Discovery;
