"use client";

import { generateRandomUserId } from "@/lib/helper";
import { LiveKitRoom, useToken } from "@livekit/components-react";
import { useMemo } from "react";

export default function Page() {
  const userInfo = useMemo(() => {
    const userIdentity = generateRandomUserId();

    return {
      identity: userIdentity,
      name: userIdentity,
    };
  }, []);

  const token = useToken(
    process.env.NEXT_PUBLIC_LIVEKIT_TOKEN_ENDPOINT,
    "test-room",
    {
      userInfo: userInfo,
    },
  );

  console.log(token);

  return (
    <>
      <div data-lk-theme="default">
        {token && (
          <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
          ></LiveKitRoom>
        )}
      </div>
    </>
  );
}
