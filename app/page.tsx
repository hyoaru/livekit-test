import { Button } from "@/components/ui/button";
import "@livekit/components-styles";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center ">
        <Link href="/room" prefetch>
          <Button>Enter room</Button>
        </Link>
      </div>
    </>
  );
}
