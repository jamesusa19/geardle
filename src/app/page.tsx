"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="m-[10px]">
      <div
        onClick={() => router.push("/classic")}
        className="flex flex-col gap-[5px] justify-center items-center cursor-pointer"
      >
        <div className="flex bg-gred items-center">
          <Image
            src={`/strive-icon.png`}
            alt="Website logo"
            width={50}
            height={50}
            className="h-fit"
          />
          <div className="flex flex-col items-center justify-center bg-ggray text-white">
            <span>Character</span>
            <span>Guess from a series of types</span>
          </div>
        </div>
      </div>
    </div>
  )
}
