import { Leave } from "@/types/leave";
import { Student } from "@/types/Student";
import axios from "axios";
import toast from "react-hot-toast";

let LeavePromise: Promise<Leave[]> | null = null;
let cachedLeave: Leave[] | null = null;

const fetchLeave = (student: Student): Leave[] => {
  if (cachedLeave) {
    return cachedLeave;
  }
  if (student._id === undefined) {
    return [];
  }
  if (!LeavePromise) {
    LeavePromise = axios
      .post("/api/leave/getAllLeaveForStudent", { studentId: student._id })
      .then((res) => {
        cachedLeave = res.data;
        return res.data;
      });
  }

  throw LeavePromise;
};

const LeaveTable = ({ student }: { student: Student }) => {
  const leaves = fetchLeave(student);
  console.log(leaves);
  const handleDelete = async (leaveId: string) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;
    try {
      await axios.delete(`/api/leave/delete`, { data: { leaveId } });
      toast.success("Leave deleted successfully.");
    } catch (error) {
      toast.error("Error deleting leave. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="my-4">
        <table className="table table-zebra text-base">
          <thead>
            <tr className="text-base-content text-base">
              <th className="border-base-content px-4 ">#</th>
              <th className="border-base-content px-4 ">Leave Type</th>
              <th className="border-base-content px-4 ">Start Date</th>
              <th className="border-base-content px-4 ">End Date</th>
              <th className="border-base-content px-4 ">Reason</th>
              <th className="border-base-content px-4 ">Status</th>
              <th className="border-base-content px-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={leave._id} className="bg-base-100 text-base-content">
                <td className="border-r border-base-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border-r border-base-300 px-4 py-2">
                  {leave.leaveType}
                </td>
                <td className="border-r border-base-300 px-4 py-2">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="border-r border-base-300 px-4 py-2">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="border-r border-base-300 px-4 py-2">
                  {leave.reason}
                </td>
                <td className="border-r border-base-300 px-4 py-2">
                  {leave.status}
                </td>
                <td className="border-r border-base-300 px-4 py-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleDelete(leave._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
