const SectionTitle = ({
  title,
  width = "570px",
  center,
  mb = "30px",
}: {
  title: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
        data-wow-delay=".1s"
        style={{ maxWidth: width, marginBottom: mb, padding: "20px" }}
      >
        <h2 className="-mb-4 text-xl font-bold capitalize !leading-tight text-black dark:text-white sm:text-xl md:text-[30px]">
          {title}
        </h2>
      </div>
    </>
  );
};

export default SectionTitle;
