import mongoose, { Schema, Document, Types } from "mongoose";

const SubjectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ["regular", "elective", "audit", "practical"],
    required: true,
  },
});

const SemesterSchema = new Schema({
  semesterNumber: { type: Number, required: true },
  subjects: [SubjectSchema],
});

const AcademicStructureSchema = new Schema({
  departmentName: { type: String, required: true, unique: true },
  semesters: [SemesterSchema],
});

export interface IAcademicStructure extends Document {
  departmentName: string;
  semesters: {
    semesterNumber: number;
    subjects: {
      name: string;
      type: "regular" | "elective" | "audit" | "practical";
    }[];
  }[];
}

const AcademicStructure =
  mongoose.models.AcademicStructure ||
  mongoose.model<IAcademicStructure>(
    "AcademicStructure",
    AcademicStructureSchema
  );

export default AcademicStructure;
