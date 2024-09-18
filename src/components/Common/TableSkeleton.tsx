const TableSkeleton = () => {
  return (
    <>
      <div className="w-full animate-pulse mt-5">
        <table className="text-surface min-w-full text-left text-sm font-light">
          <thead className="dark:bg-body-dark border-b border-neutral-200 font-medium bg-base-300">
            <tr>
              <th scope="col" className="px-6 py-4">
                <div className="w-24 h-4 skeleton"></div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="w-24 h-4 skeleton"></div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="w-24 h-4 skeleton"></div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="w-24 h-4 skeleton"></div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="w-24 h-4 skeleton"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index} className="border-b border-neutral-200">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="w-6 h-4 skeleton"></div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="w-24 h-4 skeleton"></div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="w-32 h-4 skeleton"></div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="w-40 h-4 skeleton"></div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="w-20 h-4 skeleton"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSkeleton;
