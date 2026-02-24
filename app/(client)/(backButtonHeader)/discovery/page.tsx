import React, { Fragment } from "react";
import DiscoveryHeaderHelper from "./components/DiscoveryHeaderHelper";
import DiscoveryPageDataProvider from "./components/DiscoveryPageDataProvider";
import DiscoveryFilterController from "./components/discoveryFilterController/DiscoveryFilterController";
import DiscoveryItem from "@/components/discovery/DiscoveryItem";
import { getRequest } from "@/function/get/commonGet";
import { PageResponseContentsDto, ContentsType } from "@/types/dto";

export const dynamic = "force-dynamic";

const discoveryPage = async () => {
  let contents: PageResponseContentsDto["items"] = [];
  try {
    const result = await getRequest<PageResponseContentsDto>("/contents");
    contents = result.items || [];
  } catch {
    contents = [];
  }

  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      <DiscoveryHeaderHelper />
      <DiscoveryPageDataProvider initialData={{}}>
        <DiscoveryFilterController />
        <ul className="mt-14 w-full px-[var(--client-layout-margin)]">
          {contents.length > 0 ? (
            contents.map((item, index) => (
              <Fragment key={item.id}>
                <DiscoveryItem
                  className="h-fit w-full"
                  contentType={
                    item.urls?.[0]
                      ? ContentsType[item.urls[0].type] || "기타"
                      : "기타"
                  }
                  title={item.title || ""}
                  imageUrl={item.image}
                />
                {index < contents.length - 1 && <div className="border-b" />}
              </Fragment>
            ))
          ) : (
            <p className="mt-6 text-center text-gray-500">
              콘텐츠가 없습니다.
            </p>
          )}
        </ul>
      </DiscoveryPageDataProvider>
    </main>
  );
};

export default discoveryPage;
