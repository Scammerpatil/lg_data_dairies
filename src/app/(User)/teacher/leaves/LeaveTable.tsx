import formatDate from "@/helper/DateFormatter";
import { Leave } from "@/types/leave";
import { Teacher } from "@/types/Teacher";
import axios from "axios";
import toast from "react-hot-toast";

let leavePromise: Promise<Leave[]> | null = null;
let cachedLeave: Leave[] | null = null;

const fetchLeave = (user: Teacher): Leave[] => {
  if (user === undefined) {
    return [];
  }
  if (cachedLeave) {
    return cachedLeave;
  }
  if (!leavePromise) {
    leavePromise = axios
      .post("/api/leave/getAllLeaveForLG", { _id: user._id })
      .then((res) => {
        cachedLeave = res.data.applications;
        return res.data.applications;
      });
  }
  throw leavePromise;
};

const LeaveTable = ({ user }: { user: Teacher }) => {
  const leaves = fetchLeave(user);
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = axios.put("/api/leave/updateLeave", {
        id,
        status: newStatus,
      });
      toast.promise(response, {
        loading: "Updating leave application status...",
        success: "Leave application status updated successfully.",
        error: "Error updating leave application status.",
      });
    } catch (error) {
      console.error("Error updating leave application status:", error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead className="text-base bg-base-300">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>PRN</th>
            <th>Leave Reason</th>
            <th>Description</th>
            <th>Start Date:</th>
            <th>End Date:</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* body */}
          {leaves.map((leave, index) => (
            <tr key={index} className="text-base">
              <td>{index + 1}</td>
              <td>{leave.studentId?.name!}</td>
              <td>{leave.studentId.prn}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.reason.slice(0, 10)}</td>
              <td>{formatDate(new Date(leave.startDate))}</td>
              <td>{formatDate(new Date(leave.endDate))}</td>
              <td>
                <select
                  className="p-2 bg-base-100"
                  value={leave.status}
                  onChange={(e) => {
                    leave.status = e.target.value as any;
                    handleStatusChange(leave._id, e.target.value);
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
