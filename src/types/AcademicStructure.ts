export type AcademicStructure = {
  _id: string;
  departmentName: string;
  semesters: {
    _id: string;
    semesterNumber: number;
    subjects: {
      _id: string;
      name: string;
      type: "regular" | "elective" | "audit" | "practical";
    }[];
  }[];
};
