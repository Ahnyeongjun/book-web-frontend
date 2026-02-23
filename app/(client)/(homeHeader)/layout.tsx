import HomeHeader from "./components/homeHeader/HomeHeader";

const homeHeaderlayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <HomeHeader />
      <div className="overflow-hidden">{children}</div>
    </>
  );
};

export default homeHeaderlayout;
