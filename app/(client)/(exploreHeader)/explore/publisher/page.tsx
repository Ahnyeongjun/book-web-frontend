import { getPublishers } from "@/function/get/client";
import Link from "next/link";
import PublisherGridItem from "./components/PublisherGridItem";
import PublisherPageDataProvider from "./components/PublisherPageDataProvider";
import PublisherFilterController from "./components/publisherFilterController/PublisherFilterController";

const PublisherPage = async () => {
  const initialData = await getPublishers();
  console.log(initialData, '출판사');
  
  return (
    <main className="relative flex size-full flex-col items-center">
      <PublisherPageDataProvider initialData={{initialData}}>
        <PublisherFilterController />
        <section className="mt-14 grid size-full grid-cols-3 gap-2 p-9">
          {initialData.items.map((item) => (
            <Link href={`/publisher/${item.id}`} key={item.id}>
              <PublisherGridItem
                key={item.id}
                imageUrl={item.logo}
                instagramId={item.urls[0]?.url || ""}
                publisherName={item.name}
              />
            </Link>
          ))}
        </section>
      </PublisherPageDataProvider>
    </main>
  );
};

export default PublisherPage;
