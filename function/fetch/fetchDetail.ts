import { getContentDetail, getPublisherDetail } from "../get/client";

export const fetchDetail = (id: number, pathName: string) => {
  try {
    let data;
    if (pathName === "/admin/content") {
      data = getContentDetail(id);
    } else if (pathName === "/admin/publisher") {
      data = getPublisherDetail(id);
    }
    return data;
  } catch (e) {
    throw e;
  }
};
