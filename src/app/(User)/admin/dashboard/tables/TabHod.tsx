import { hod } from "@/types/hod";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

let hodPromise: Promise<hod[]> | null = null;
let cachedHod: hod[] | null = null;

const fetchHOD = (): hod[] => {
  if (cachedHod) {
    return cachedHod;
  }
  if (!hodPromise) {
    hodPromise = axios.get("/api/users/hods/getAllHOD").then((res) => {
      cachedHod = res.data.hod;
      return res.data.hod;
    });
  }

  throw hodPromise;
};

const TabHod = ({ fromMangeHod }: { fromMangeHod: boolean }) => {
  const hods = fetchHOD();
  const [hod, setHod] = useState<string | undefined>("");

  const handleApprovalChange = async (
    _id: string,
    value: string,
    email: string
  ) => {
    const response = axios.put("/api/users/hods/updateHOD", {
      _id,
      isApproved: value === "Approved",
    });
    toast.promise(response, {
      loading: "Updating HOD...",
      success: "HOD Updated Successfully",
      error: "Error Updating HOD",
    });

    try {
      if ((await response) && value === "Approved") {
        const approvalEmail = axios.post("/api/helper/approvalemail", {
          email,
        });
        toast.promise(approvalEmail, {
          loading: "Sending Approval Email...",
          success: "Approval Email Sent Successfully",
          error: "Error Sending Approval Email",
        });
      }
    } catch (error) {
      console.error("Error during email approval process:", error);
    }
  };

  const handleDelete = (_id: string) => {
    const response = axios.delete("/api/users/hods/deleteHOD", {
      data: { _id },
    });
    toast.promise(response, {
      loading: "Deleting HOD...",
      success: "HOD Deleted Successfully",
      error: "Error Deleting HOD",
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="my-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Enter The Name of the Teacher"
            value={hod}
            onChange={(e) => setHod(e.target.value)}
          />
          <Search />
        </label>
      </div>
      <table className="table table-zebra">
        <thead className="text-base bg-base-300">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>{fromMangeHod ? "Approve" : "Status"}</th>
            {fromMangeHod && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {hod &&
            hod.trim() !== "" &&
            hods
              .filter((hod) =>
                hod.name.toLowerCase().includes(hod.name.toLowerCase())
              )
              .map((hod, index) => (
                <tr key={index} className="text-base">
                  <td>{index + 1}</td>
                  <td>{hod.name}</td>
                  <td className="capitalize">{hod.department}</td>
                  <td>{hod.email}</td>
                  <td>
                    {fromMangeHod ? (
                      <select
                        className="h-full w-full border-zinc-200 border-x-white bg-transparent px-4"
                        value={hod.isAdminApproved ? "Approved" : "Pending"}
                        onChange={(e) =>
                          handleApprovalChange(
                            hod._id,
                            e.target.value,
                            hod.email
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                    ) : (
                      <span>
                        {hod.isAdminApproved ? "Approved" : "Pending"}
                      </span>
                    )}
                  </td>
                  {fromMangeHod && (
                    <td>
                      <button
                        onClick={() => handleDelete(hod._id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          {hod?.trim() === "" &&
            hods.map((hod, index) => (
              <tr key={index} className="text-base">
                <td>{index + 1}</td>
                <td>{hod.name}</td>
                <td className="capitalize">{hod.department}</td>
                <td>{hod.email}</td>
                <td>
                  {fromMangeHod ? (
                    <select
                      className="h-full w-full border-zinc-200 border-x-white bg-transparent px-4"
                      value={hod.isAdminApproved ? "Approved" : "Pending"}
                      onChange={(e) =>
                        handleApprovalChange(hod._id, e.target.value, hod.email)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  ) : (
                    <span>{hod.isAdminApproved ? "Approved" : "Pending"}</span>
                  )}
                </td>
                {fromMangeHod && (
                  <td>
                    <button
                      onClick={() => handleDelete(hod._id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabHod;
