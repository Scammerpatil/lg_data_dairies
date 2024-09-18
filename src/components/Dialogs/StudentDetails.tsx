import { Student } from "@/types/student";

const StudentDetails = ({ student }: { student: Student }) => {
  return (
    <dialog id="studentDetails" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg text-center">Student Details</h3>
        <img
          src={
            student?.profileImageUrl ||
            `https://xsgames.co/randomusers/assets/avatars/male/1.jpg`
          }
          alt="Profile Image"
          className="m-auto mt-3 rounded-full w-24 h-24"
        />
        <p className="py-4 text-center font-semibold">{student?.name}</p>
        <p className="text-sm text-center text-gray-500">ID: {student?._id}</p>

        <div className="mt-4 space-y-2">
          <p className="text-sm">
            <strong>Department: </strong> {student?.department || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Year: </strong> {student?.year || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Email: </strong>{" "}
            <a href={`mailto:${student?.email}`} className="link link-hover">
              {student?.email || "N/A"}
            </a>
          </p>
          <p className="text-sm">
            <strong>Phone No: </strong>{" "}
            <a
              href={`tel:${student?.personalDetails?.mobileNumber}`}
              className="link link-hover"
            >
              {student?.personalDetails?.mobileNumber || "N/A"}
            </a>
          </p>
          <p className="text-sm">
            <strong>Address: </strong>{" "}
            {student?.personalDetails?.permanentAddress || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Gender: </strong>{" "}
            {student?.personalDetails?.gender || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Date of Birth: </strong>{" "}
            {student?.personalDetails?.dob
              ? new Date(student.personalDetails.dob).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-sm">
            <strong>Blood Group: </strong>{" "}
            {student?.personalDetails?.bloodGroup || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Marital Status: </strong>{" "}
            {student?.personalDetails?.maritalStatus || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Nationality: </strong>{" "}
            {student?.personalDetails?.nationality || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Category: </strong>{" "}
            {student?.personalDetails?.category || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Domicile: </strong>{" "}
            {student?.personalDetails?.domicile || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Religion: </strong>{" "}
            {student?.personalDetails?.religion || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Caste: </strong> {student?.personalDetails?.caste || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Hostel Info: </strong>{" "}
            {student?.personalDetails?.hostel?.livingAtHostel || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Parent Details:</strong>
          </p>
          <p className="text-sm">
            <strong>Father's Name: </strong>{" "}
            {student?.parentDetails?.father?.name || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Mother's Name: </strong>{" "}
            {student?.parentDetails?.mother?.name || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Father's Contact: </strong>{" "}
            {student?.parentDetails?.father?.contactNumber || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Mother's Contact: </strong>{" "}
            {student?.parentDetails?.mother?.contactNumber || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Father's Occupation: </strong>{" "}
            {student?.parentDetails?.father?.occupation || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Mother's Occupation: </strong>{" "}
            {student?.parentDetails?.mother?.occupation || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Address: </strong>{" "}
            {student?.parentDetails?.father?.address || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Parent's Email: </strong>{" "}
            {student?.parentDetails?.father.email || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Bank Details:</strong>
          </p>
          <p className="text-sm">
            <strong>Bank Name: </strong>{" "}
            {student?.bankDetails?.bankName || "N/A"}
          </p>
          <p className="text-sm">
            <strong>IFSC Code: </strong>{" "}
            {student?.bankDetails?.ifscCode || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Account Number: </strong>{" "}
            {student?.bankDetails?.accountNumber || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Academic Details:</strong>
          </p>
          <p className="text-sm">
            <strong>SSC Marks: </strong>{" "}
            {student?.academicDetails?.ssc.marksObtained || "N/A"}
          </p>
          <p className="text-sm">
            <strong>HSC Marks: </strong>{" "}
            {student?.academicDetails?.hsc.marksObtained || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Diploma Marks: </strong>{" "}
            {student?.academicDetails?.diploma.marksObtained || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Entrance Exam Details: </strong> {"N/A"}
          </p>
          <p className="text-sm">
            <strong>Engineering Details:</strong>
          </p>
          <p className="text-sm">
            <strong>Term Test Marks: </strong>{" "}
            {/* {student?.engineeringDetails?.semesters || "N/A"} */}
          </p>
          <p className="text-sm">
            <strong>Attendance: </strong>{" "}
            {/* {student?.engineeringDetails?.attendance || "N/A"} */}
          </p>
          <p className="text-sm">
            <strong>End Semester Marks: </strong>{" "}
            {/* {student?.engineeringDetails?.endSemesterMarks || "N/A"} */}
          </p>
          <p className="text-sm">
            <strong>Portfolio Details:</strong>
          </p>
          <p className="text-sm">
            <strong>Skills: </strong>{" "}
            {student?.portfolioDetails?.skills || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Competitions: </strong>{" "}
            {/* {student?.portfolioDetails?.competitions || "N/A"} */}
          </p>
          <p className="text-sm">
            <strong>Internships: </strong>{" "}
            {/* {student?.portfolioDetails?.internships || "N/A"} */}
          </p>
          <p className="text-sm">
            <strong>Health Details:</strong>
          </p>
          <p className="text-sm">
            <strong>Major Health Problems: </strong>{" "}
            {/* {student?.healthDetails?.majorHealthProblems || "N/A"} */}
          </p>
          <p className="text-sm">
            <strong>Treatment Details: </strong>{" "}
            {/* {student?.healthDetails?.treatmentDetails || "N/A"} */}
          </p>
        </div>
        <div className="modal-action">
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default StudentDetails;
