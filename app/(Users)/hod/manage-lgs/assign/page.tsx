"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import { CircleCheck, Eye, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

type LG = {
  _id: number;
  name: string;
  email: string;
  isLG: boolean;
  avatar: string;
  department: string;
};

const ApproveLG = () => {
  const [lgData, setLgData] = useState<LG[]>([]);

  useEffect(() => {
    const fetchLGData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const department = user.department.toLowerCase();
        const response = await axios.post(
          "/api/getUsers/teachers/getTeacherByDepartment",
          { department },
        );
        setLgData(response.data.teachers);
      } catch (error) {
        toast.error("Failed to fetch LG data");
      }
    };
    fetchLGData();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const response = axios.post("/api/getUsers/teachers/approveTeacher", {
        id,
        isLG: true,
      });
      toast.promise(response, {
        loading: "Approving Teacher as LG...",
        success: () => {
          setLgData((prev) =>
            prev.map((lg) => (lg._id === id ? { ...lg, isLG: true } : lg)),
          );
          return `Teacher with id ${id} approved`;
        },
        error: () => {
          return `Failed to approve Teacher with id ${id}`;
        },
      });
    } catch (error) {
      toast.error(`Failed to approve Teacher with id ${id}`);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = axios.post("/api/getUsers/teachers/approveTeacher", {
        id,
        isLG: false,
      });
      toast.promise(response, {
        loading: "Removing Teacher from LG...",
        success: () => {
          setLgData((prev) =>
            prev.map((lg) => (lg._id === id ? { ...lg, isLG: false } : lg)),
          );
          return `Teacher with id ${id} removed`;
        },
        error: () => {
          return `Failed to remove Teacher with id ${id}`;
        },
      });
    } catch (error) {
      toast.error(`Failed to remove Teacher with id ${id}`);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Approve Local Guardians</h1>
      <Table aria-label="Approve Local Guardians">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {lgData.length > 0 ? (
            lgData.map((lg, index) => (
              <TableRow key={lg._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <User
                    name={lg.name}
                    description={lg.department}
                    avatarProps={{
                      radius: "lg",
                      src: `https://xsgames.co/randomusers/assets/avatars/female/${
                        index + 50
                      }.jpg`,
                    }}
                  />
                </TableCell>
                <TableCell>{lg.email}</TableCell>
                <TableCell>
                  <Chip className="capitalize" size="sm" variant="flat">
                    {lg.isLG ? "Approved" : "Pending"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip content="Details">
                      <Button
                        className="text-default-400 cursor-pointer text-lg active:opacity-50"
                        color="info"
                        onClick={() => {
                          console.log(lg);
                        }}
                      >
                        <Eye />
                      </Button>
                    </Tooltip>
                    {!lg.isLG ? (
                      <Tooltip content="Approve Teacher">
                        <Button
                          className="text-default-400 cursor-pointer text-lg active:opacity-50"
                          onClick={() => handleApprove(lg._id)}
                        >
                          <CircleCheck />
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip content="Revoke Teacher">
                        <Button
                          className="text-danger cursor-pointer text-lg active:opacity-50"
                          onClick={() => handleReject(lg._id)}
                        >
                          <XCircle />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center">No LGs to approve</TableCell>
              <TableCell className="text-center">No LGs to approve</TableCell>
              <TableCell className="text-center">No LGs to approve</TableCell>
              <TableCell className="text-center">No LGs to approve</TableCell>
              <TableCell className="text-center">No LGs to approve</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApproveLG;
