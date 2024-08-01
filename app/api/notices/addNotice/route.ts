import Notice from "@/models/Notice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    title,
    description,
    tags,
    isImportant,
    author,
    authorDepartment,
    image,
  } = await req.json();

  if (!title || !description || !image) {
    return NextResponse.json(
      { message: "Please fill all the fields." },
      { status: 400 },
    );
  }
  const notice = new Notice({
    title,
    description,
    imageURL: image,
    author,
    authorDepartment,
    tags,
    isImportant,
  });
  const newNotice = await notice.save();
  if (newNotice) {
    return NextResponse.json(
      { message: "Notice added successfully!" },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: "An error occurred while adding the notice." },
      { status: 500 },
    );
  }
}
