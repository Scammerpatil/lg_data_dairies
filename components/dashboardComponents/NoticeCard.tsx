import { Badge, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type NoticeProps = {
  title: string;
  description: string;
  imageURL: string;
  author: string;
  authorDepartment: string;
  createdAt: Date;
  tags: string;
  isImportant: boolean;
};

const NoticeCard = (props: NoticeProps) => {
  return (
    <div className="w-80 rounded-lg border border-gray-300 p-4 shadow-md">
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
        <Badge
          badgeContent={props.tags || "N/A"}
          color={props.isImportant ? "error" : "primary"}
          className="absolute left-[15rem] top-2 capitalize"
        />
        <Image
          src={props.imageURL}
          alt="notice"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex-col gap-3">
        <Typography variant="h6" className="mb-2 mt-2 font-semibold">
          {props.title}
        </Typography>
        <Divider />
        <Typography variant="body2" className="mb-2 mt-2 text-gray-600">
          {props.description}
        </Typography>
        <Typography
          variant="subtitle2"
          className="mb-1 mt-2 text-sm font-medium"
        >
          {props.author || "N/A"}
        </Typography>
        <Typography
          variant="caption"
          className="mb-1 mt-2 text-xs capitalize text-gray-500"
        >
          {props.authorDepartment || "N/A"}
        </Typography>
        <br />
        <Typography
          variant="caption"
          className="mb-2 mt-2 text-xs text-gray-400"
        >
          {props.createdAt.toLocaleDateString()}{" "}
          {props.createdAt.toLocaleTimeString()}
        </Typography>
      </div>
    </div>
  );
};

export default NoticeCard;
