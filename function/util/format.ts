import { ContentsDtoChanged, PublisherDto } from "@/types/dto";
import { FormattedContents, FormattedPublisher } from "@/types/format";

export const formatPublisherData = (
  publishers: PublisherDto[]
): FormattedPublisher[] => {
  return publishers.map((p) => {
    return {
      PublisherName: p.name,
      InstagramID: p.engName || "",
      LogoLink: p.logo || "",
      URL: p.urls?.[0]?.url || "",
      URLType: p.urls?.[0]?.type || "",
      BookISBN: "",
      Memo: p.description || "",
      Tag: "",
      id: p.id || 0,
    };
  });
};

export const formatContentsData = (
  contents: ContentsDtoChanged[]
): FormattedContents[] => {
  return contents.map((c) => {
    return {
      contentTitle: c.title || "",
      // URL: c.urls?.[0]?.url || [],
      BookName: c.books?.[0]?.title || "",
      URL: c.urls?.map((url) => url.url) || [],
      Memo: "",
      Tag: c.tags[0]?.name || "",
      id: c.id || 0,
      BookISBN: c.books?.[0]?.isbn || "",
    };
  });
};
