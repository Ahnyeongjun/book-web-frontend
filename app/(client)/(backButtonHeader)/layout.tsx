import BackbuttonHeader from "./components/backButtonHeader/BackbuttonHeader";

const backButtonHeaderlayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <BackbuttonHeader />
      <div className="overflow-hidden">{children}</div>
    </>
  );
};

export default backButtonHeaderlayout;
