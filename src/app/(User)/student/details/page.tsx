import { Suspense } from "react";
import DetailSkeleton from "./DetailSkeleton";
import TabAccount from "./TabAccount";

const StudentDetails = () => {
  return (
    <>
      <div
        role="tablist"
        className="tabs tabs-lifted tabs-lg tabs-boxed overflow-x-auto"
      >
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-base-content active:text-base-300"
          aria-label="Account Info"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Suspense fallback={<DetailSkeleton />}>
            <TabAccount />
          </Suspense>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Engineering Details"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          {/* <Suspense fallback={<TableSkeleton />}>
            <TabTeacher fromTeacherTab={false} />
          </Suspense> */}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Portfolio Details"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          {/* <Suspense fallback={<TableSkeleton />}>
            <TabStudent fromStudentTab={false} />
          </Suspense> */}
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
