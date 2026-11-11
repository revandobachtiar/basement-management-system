
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ??
  "http://192.168.1.27:3000";

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;

    const endpoint = path.join("/");
    const searchParams = request.nextUrl.search;

    const targetUrl =
      `${BACKEND_URL}/${endpoint}${searchParams}`;

    const headers = new Headers();

    const contentType = request.headers.get("content-type");
    const authorization = request.headers.get("authorization");
    const accept = request.headers.get("accept");

    if (contentType) headers.set("content-type", contentType);
    if (authorization) headers.set("authorization", authorization);
    if (accept) headers.set("accept", accept);

    const body =
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer();

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    const responseBody = await response.arrayBuffer();

    const responseHeaders = new Headers();
    const responseContentType =
      response.headers.get("content-type");

    if (responseContentType) {
      responseHeaders.set("content-type", responseContentType);
    }

    return new NextResponse(responseBody, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[API PROXY ERROR]", error);

    return NextResponse.json(
      { message: "Gagal menghubungi backend API" },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
