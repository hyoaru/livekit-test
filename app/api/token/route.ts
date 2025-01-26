import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

// Do not cache endpoint result
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const roomName = req.nextUrl.searchParams.get("roomName");
  const identity = req.nextUrl.searchParams.get("identity");

  if (!roomName) {
    return NextResponse.json(
      { error: 'Missing "roomName" query parameter' },
      { status: 400 },
    );
  } else if (!identity) {
    return NextResponse.json(
      { error: 'Missing "identity" query parameter' },
      { status: 400 },
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: identity });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return NextResponse.json(
    { accessToken: await at.toJwt() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
