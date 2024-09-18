const CardSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          className="w-80 rounded-lg border border-gray-300 p-4 shadow-md"
          key={index}
        >
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
            <div className="h-full w-full skeleton"></div>
          </div>

          <div className="flex-col gap-3">
            <div className="skeleton h-6 w-3/4 mb-2 mt-2"></div>

            <div className="my-2">
              <div className="skeleton h-px w-full"></div>
            </div>

            <div className="skeleton h-4 w-full mb-2 mt-2"></div>
            <div className="skeleton h-4 w-5/6 mb-2"></div>

            <div className="skeleton h-4 w-1/2 mb-1 mt-2"></div>
            <div className="skeleton h-3 w-1/3 mb-1 mt-2"></div>
            <div className="skeleton h-3 w-1/4 mb-2 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
