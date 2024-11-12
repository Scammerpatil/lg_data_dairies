import { teacher } from "@/types/Teacher";

const TeacherDetails = ({ teacher }: { teacher: teacher }) => {
  return (
    <dialog id="teacherDetails" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg text-center">Teacher Details</h3>
        <img
          src={
            teacher?.profileImageUrl ||
            `https://xsgames.co/randomusers/assets/avatars/male/1.jpg`
          }
          alt="Profile Image"
          className="m-auto mt-3 rounded-full w-24 h-24"
        />
        <p className="py-4 text-center font-semibold">{teacher?.name}</p>
        <p className="text-sm text-center text-gray-500">ID: {teacher?._id}</p>

        <div className="mt-4 space-y-2">
          <p className="text-sm">
            <strong>Role: </strong> {teacher?.role || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Department: </strong> {teacher?.department || "N/A"}
          </p>
          <p className="text-sm">
            <strong>Email: </strong>{" "}
            <a href={`mailto:${teacher?.email}`} className="link link-hover">
              {teacher?.email}
            </a>
          </p>
          <p className="text-sm">
            <strong>Phone No: </strong>{" "}
            <a href={`tel:${teacher?.phoneNo}`} className="link link-hover">
              {teacher?.phoneNo || "N/A"}
            </a>
          </p>
          <p className="text-sm">
            <strong>Admin Approved: </strong>{" "}
            {teacher?.isAdminApproved ? "Yes" : "No"}
          </p>
          <p className="text-sm">
            <strong>Is Local Guardian: </strong> {teacher?.isLG ? "Yes" : "No"}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>PRN</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {teacher?.studentUnder?.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.prn}</td>
                  <td>{student.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-action">
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};
export default TeacherDetails;
