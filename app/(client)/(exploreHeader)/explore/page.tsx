import { redirect } from "next/navigation";

const explorePage = () => {
  redirect("/explore/publisher");
  return null;
};

export default explorePage;
