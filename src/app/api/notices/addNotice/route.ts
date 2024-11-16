import dbConfig from "@/middlewares/db.config";
import Notice from "@/models/Notice";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const {
    title,
    description,
    tags,
    isImportant,
    author,
    authorDepartment,
    image,
    validTill,
  } = await req.json();

  const validTillDate = validTill ? new Date(validTill) : null;

  if (validTill && isNaN(validTillDate!.getTime())) {
    return NextResponse.json(
      { message: "Invalid validTill date." },
      { status: 400 }
    );
  }

  if (!title || !description || !image) {
    return NextResponse.json(
      { message: "Please fill all the fields." },
      { status: 400 }
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
    validTill: validTillDate,
  });
  try {
    if (await notice.save()) {
      return NextResponse.json(
        { message: "Notice added successfully!" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Something went Wrong" },
      { status: 500 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
