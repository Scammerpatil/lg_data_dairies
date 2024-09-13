import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { Contact, User, Users, BookOpen, Home } from "lucide-react";

const CardDetails = ({ teacher, student }) => {
  const [data, setData] = useState(teacher || student);
  const randomAvatarIndex = Math.ceil(Math.random() * 12);

  useEffect(() => {
    setData(teacher || student);
  }, [teacher, student]);

  if (!data) return null;

  const isTeacher = Boolean(teacher);

  return (
    <Card className="mt-5 h-full w-2/5 rounded-md bg-zinc-200 p-5 py-4 dark:bg-slate-800">
      <p className="text-center text-3xl font-bold uppercase">
        {isTeacher ? "Teacher Details" : "Student Details"}
      </p>
      <img
        src={
          data.profileImageUrl ||
          `https://xsgames.co/randomusers/assets/avatars/male/${randomAvatarIndex}.jpg`
        }
        alt="Profile Image"
        width={120}
        className="m-auto rounded-full"
      />
      <CardHeader className="flex-col items-start px-4 pb-1 pt-2">
        <h4 className="text-xl font-bold">{data.name}</h4>
        <small className="text-default-500">ID: {data._id || data.prn}</small>
        <Divider className="mt-3" />
      </CardHeader>
      <CardBody className="overflow-visible">
        <div>
          {isTeacher ? (
            <>
              <div className="flex-col">
                <h1 className="flex gap-2 pb-2 text-xl font-semibold">
                  <User /> About
                </h1>
                <p className="py-1 text-sm">Role: {data.role || "N/A"}</p>
                <p className="py-1 text-sm">
                  Department: {data.department || "N/A"}
                </p>
              </div>
              <Divider className="py-2" />
              <div className="flex-col">
                <h1 className="flex gap-2 pb-1 text-xl font-semibold">
                  <Contact /> Contact Info
                </h1>
                <p className="py-1 text-sm">
                  Email: <a href={`mailto:${data.email}`}>{data.email}</a>
                </p>
                <p className="py-1 text-sm">
                  Phone No:{" "}
                  <a href={`tel:${data.phoneNo}`}>{data.phoneNo || "N/A"}</a>
                </p>
                <p className="py-1 text-sm">
                  Verified: {data.isVerified ? "Yes" : "No"}
                </p>
                <p className="py-1 text-sm">
                  Admin Approved: {data.isAdminApproved ? "Yes" : "No"}
                </p>
                <p className="py-1 text-sm">
                  Is Local Guardian: {data.isLG ? "Yes" : "No"}
                </p>
              </div>
              <Divider className="py-2" />
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
                      Student PRN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Student Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.studentUnder?.length > 0 ? (
                    data.studentUnder.map((student, index) => (
                      <tr key={student._id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {student.prn}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {student.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No students assigned
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div className="flex-col">
                <h1 className="flex gap-2 pb-2 text-xl font-semibold">
                  <User /> Personal Details
                </h1>
                <p className="py-1 text-sm">PRN: {data.prn}</p>
                <p className="py-1 text-sm">
                  Gender: {data.personalDetails?.gender || "N/A"}
                </p>
                <p className="py-1 text-sm">
                  DOB: {data.personalDetails?.dob || "N/A"}
                </p>
                <p className="py-1 text-sm">
                  Nationality: {data.personalDetails?.nationality || "N/A"}
                </p>
              </div>
              <Divider className="py-2" />
              <div className="flex-col">
                <h1 className="flex gap-2 pb-1 text-xl font-semibold">
                  <Contact /> Contact Info
                </h1>
                <p className="py-1 text-sm">
                  Email: <a href={`mailto:${data.email}`}>{data.email}</a>
                </p>
                <p className="py-1 text-sm">
                  Phone No:{" "}
                  <a href={`tel:${data.personalDetails?.mobileNumber}`}>
                    {data.personalDetails?.mobileNumber || "N/A"}
                  </a>
                </p>
              </div>
              <Divider className="py-2" />
              <div className="flex-col">
                <h1 className="flex gap-2 pb-1 text-xl font-semibold">
                  <BookOpen /> Academic Details
                </h1>
                {data.academicDetails.ssc && (
                  <p className="py-1 text-sm">
                    SSC: {data.academicDetails.ssc.instituteName},{" "}
                    {data.academicDetails.ssc.marksObtained || "N/A"}
                  </p>
                )}
                {data.academicDetails.hsc && (
                  <p className="py-1 text-sm">
                    HSC: {data.academicDetails.hsc.instituteName},{" "}
                    {data.academicDetails.hsc.marksObtained || "N/A"}
                  </p>
                )}
                {data.academicDetails.diploma && (
                  <p className="py-1 text-sm">
                    Diploma: {data.academicDetails.diploma.instituteName},{" "}
                    {data.academicDetails.diploma.marksObtained || "N/A"}
                  </p>
                )}
                {data.academicDetails.entranceExam && (
                  <p className="py-1 text-sm">
                    Entrance Exam: {data.academicDetails.entranceExam.name},{" "}
                    {data.academicDetails.entranceExam.marks || "N/A"}
                  </p>
                )}
              </div>
              <Divider className="py-2" />
              <div className="flex-col">
                <h1 className="flex gap-2 pb-1 text-xl font-semibold">
                  <Home /> Hostel Details
                </h1>
                <p className="py-1 text-sm">
                  Hostel Name: {data.hostelDetails?.hostelName || "N/A"}
                </p>
                <p className="py-1 text-sm">
                  Room No: {data.hostelDetails?.roomNo || "N/A"}
                </p>
                <p className="py-1 text-sm">
                  Floor: {data.hostelDetails?.floor || "N/A"}
                </p>
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDetails;
