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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cameras = await readCameras();
    const camera = cameras.find((c) => c.id === id);

    if (!camera) {
      return NextResponse.json(
        { message: "Camera tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(camera);
  } catch (error) {
    console.error("[CAMERA API GET BY ID ERROR]", error);
    return NextResponse.json(
      { message: "Gagal membaca data kamera" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cameras = await readCameras();
    const index = cameras.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Camera tidak ditemukan" },
        { status: 404 }
      );
    }

    cameras[index] = { ...cameras[index], ...body };
    await writeCameras(cameras);

    return NextResponse.json(cameras[index]);
  } catch (error) {
    console.error("[CAMERA API PUT ERROR]", error);
    return NextResponse.json(
      { message: "Gagal memperbarui kamera" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cameras = await readCameras();
    const index = cameras.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Camera tidak ditemukan" },
        { status: 404 }
      );
    }

    cameras.splice(index, 1);
    await writeCameras(cameras);

    return NextResponse.json({ message: "Camera berhasil dihapus" });
  } catch (error) {
    console.error("[CAMERA API DELETE ERROR]", error);
    return NextResponse.json(
      { message: "Gagal menghapus kamera" },
      { status: 500 }
    );
  }
}