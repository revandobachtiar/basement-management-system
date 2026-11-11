import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const CAMERAS_FILE = path.join(process.cwd(), "data", "cameras.json");

async function readCameras(): Promise<CameraEntry[]> {
  try {
    const data = await readFile(CAMERAS_FILE, "utf-8");
    return JSON.parse(data) as CameraEntry[];
  } catch {
    return [];
  }
}

async function writeCameras(cameras: CameraEntry[]): Promise<void> {
  await writeFile(CAMERAS_FILE, JSON.stringify(cameras, null, 2), "utf-8");
}

type CameraEntry = {
  id: string;
  name: string;
  streamingUrl: string;
  streamType: string;
  basementId: string;
  lineId: string;
  direction: string;
  isActive: boolean;
};

export async function GET() {
  try {
    const cameras = await readCameras();
    return NextResponse.json(cameras);
  } catch (error) {
    console.error("[CAMERA API GET ERROR]", error);
    return NextResponse.json(
      { message: "Gagal membaca data kamera" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cameras = await readCameras();

    const newCamera: CameraEntry = {
      id: `camera-${Date.now()}`,
      ...body,
    };

    cameras.push(newCamera);
    await writeCameras(cameras);

    return NextResponse.json(newCamera, { status: 201 });
  } catch (error) {
    console.error("[CAMERA API POST ERROR]", error);
    return NextResponse.json(
      { message: "Gagal menambahkan kamera" },
      { status: 500 }
    );
  }
}