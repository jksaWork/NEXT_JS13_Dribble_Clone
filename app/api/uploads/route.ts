import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "dmlxgat17",
  api_key: "695878523419342",
  api_secret: "Zp0J-tx9BNyrUP-Yd5jYZjujF50",
});

// NextRequest

export const POST = async (req: NextRequest) => {
  const { path } = await req.json();
  if (!path) {
    return NextResponse.json({ message: "Image Path Required" }, 400);
  }
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
