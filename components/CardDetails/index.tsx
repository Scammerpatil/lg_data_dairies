import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Contact, User, Users } from "lucide-react";

const CardDetails = (props: any) => {
  const [teacher, setTeacher] = useState(props.teacher);
  const random = Math.ceil(Math.random() * 12);
  return (
    <Card className="w-2/5 rounded-md bg-zinc-200 p-5 py-4 dark:bg-slate-800">
      <p className="text-center text-3xl font-bold uppercase">
        Teacher Details
      </p>
      <img
        src={`https://xsgames.co/randomusers/assets/avatars/female/${random}.jpg`}
        alt="Profile Image"
        width={120}
        className="m-auto rounded-full"
      />
      <CardHeader className="flex-col items-start px-4 pb-1 pt-2">
        <h4 className="text-xl font-bold">{teacher.name}</h4>
        <small className="text-default-500">ID: {teacher._id}</small>
        <Divider className="mt-3" />
      </CardHeader>
      <CardBody className="overflow-visible">
        <div>
          <div className="flex-col">
            <h1 className="flex gap-2 pb-2 text-xl font-semibold">
              <User /> About
            </h1>
            <p className="py-1 text-sm">Role: {teacher.role}</p>
            <p className="py-1 text-sm">Department: {teacher.department}</p>
          </div>
          <Divider className="py-2" />
          <div className="flex-col">
            <h1 className="flex gap-2 pb-1 text-xl font-semibold">
              <Contact />
              Contact Info
            </h1>
            <a href={`emailto:${teacher.email}`} className="py-1 text-sm">
              Email: {teacher.email}
            </a>
            <br />
            <a href={`callto:${teacher.email}`} className="py-1 text-sm">
              Phone No: {teacher.phoneNo ? teacher.phoneNo : "7499455643"}
            </a>
            <p className="py-1 text-sm">
              Verified: {teacher.isVerified ? "Yes" : "No"}
            </p>
            <p className="py-1 text-sm">
              Admin Approved: {teacher.isAdminApproved ? "Yes" : "No"}
            </p>
            <p className="py-1 text-sm">
              Is An Local Guardian: {teacher.isLG ? "Yes" : "No"}
            </p>
          </div>
          <Divider />
          <p className="text-tiny flex gap-2 py-2 font-bold uppercase">
            <Users /> Students Under
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Student ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {teacher.studentUnder.length > 0 ? (
                teacher.studentUnder.map((studentId, index) => (
                  <tr key={studentId}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {studentId}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No students assigned
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDetails;
