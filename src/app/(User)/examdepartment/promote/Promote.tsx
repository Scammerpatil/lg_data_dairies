import { Student } from "@/types/student";
import axios from "axios";

var StudentPromise: Promise<Student[]> | null = null;
var cachedStudent: Student[] | null = null;

const fetchStudent = async (): Promise<Student[]> => {
  if (cachedStudent) {
    return cachedStudent;
  }
  if (!StudentPromise) {
    StudentPromise = axios
      .get("/api/users/students/getAllStudents")
      .then((res) => {
        cachedStudent = res.data.students;
        return res.data.students;
      })
      .catch((err) => {
        console.error("Error fetching students", err);
        return [];
      });
  }
  throw StudentPromise;
};

const Promote = () => {
  const students = fetchStudent();
  return (
    <div className="p-6 max-w-md mx-auto bg-base-200 shadow-md rounded-lg">
      <div role="tablist" className="tabs tabs-boxed">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 1"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 3"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 3
        </div>
      </div>
    </div>
  );
};

export default Promote;
