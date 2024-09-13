import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

type ApplicationType = {
  _id: string;
  studentId: {
    name: string;
    prn: string;
  };
  reason: string;
  startDate: Date;
  endDate: Date;
  status: string;
};

const LeaveApplication = ({ application, onStatusChange }) => {
  const [status, setStatus] = useState(application.status);
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(application._id, newStatus);
  };

  return (
    <Card className="mt-5 w-full rounded-md bg-zinc-200 p-5 py-4 dark:bg-slate-800">
      <CardHeader className="flex justify-between">
        <h4 className="text-xl font-bold">{application.studentId?.name}</h4>
        <small className="text-default-500">
          PRN: {application.studentId?.prn}
        </small>
      </CardHeader>
      <CardBody>
        <p className="py-1 text-sm">Reason: {application.reason}</p>
        <p className="py-1 text-sm">
          Start Date: {formatDate(application.startDate)}
        </p>
        <p className="py-1 text-sm">
          End Date: {formatDate(application.endDate)}
        </p>
        <p className="py-1 text-sm">Current Status: {application.status}</p>
        <div className="mt-3">
          <label htmlFor={`status-${application._id}`} className="mr-2">
            Change Status:
          </label>
          <select
            id={`status-${application._id}`}
            value={status}
            onChange={handleChange}
            className="rounded-md p-1"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeaveApplication;
