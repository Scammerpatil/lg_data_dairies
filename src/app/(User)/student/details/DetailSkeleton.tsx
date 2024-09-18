const DetailSkeleton = () => {
  return (
    <>
      <div className="w-full text-base-content">
        <div className="flex items-center">
          <div className="skeleton w-24 h-24 rounded-full"></div>

          <div className="ml-4">
            <div className="skeleton w-24 h-10 rounded mb-2"></div>
            <div className="skeleton w-32 h-10 rounded mb-2"></div>
            <div className="skeleton w-20 h-10 rounded mb-2"></div>
            <div className="skeleton w-40 h-5 mt-5"></div>
          </div>
        </div>
        <hr className="border-base-300 my-5" />
      </div>
    </>
  );
};
export default DetailSkeleton;
