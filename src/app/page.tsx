"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      id="root"
      className="bg-[url(/strive-background.png)] bg-no-repeat bg-[center_center] bg-fixed bg-cover w-full h-full fixed bg-[rgba(0,_0,_0,_0.1)] bg-blend-darken"
    >
      <div className="m-[10px]">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={`/logo.png`}
            alt="Website logo"
            width={344}
            height={200}
          />
          <div>Test your Guilty Gear knowledge</div>
          <div
            onClick={() => router.push("/classic")}
            className="flex flex-col gap-[5px] justify-center items-center cursor-pointer"
          >
            <div className="flex bg-[#B61604] items-center">
              <Image
                src={`/strive-icon.png`}
                alt="Website logo"
                width={50}
                height={50}
                className="h-fit"
              />
              <div className="flex flex-col items-center justify-center bg-[#272727] text-[#FFFFFF]">
                <span>Character</span>
                <span>Guess from a series of types</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
