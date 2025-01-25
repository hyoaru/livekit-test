"use client";

import "@livekit/components-styles";
import { PreJoin } from "@livekit/components-react";

export default function Home() {
  return (
    <>
      <div>
        <PreJoin data-lk-theme="default" />
      </div>
    </>
  );
}
