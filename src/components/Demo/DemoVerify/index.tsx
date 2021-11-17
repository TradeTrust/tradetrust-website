import React, { FunctionComponent } from "react";
import Link from "next/link";
import { MagicDropzone } from "../../MagicDropzone";

export const DemoVerify: FunctionComponent = () => {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full lg:w-2/3 xl:w-1/2">
        <p className="mb-8">
          This is a demo verifier used specifically for verifying files created via our demo. To verify other files,
          please use the{" "}
          <Link href="/verify">
            <a>verifier on our main net</a>
          </Link>
          .
        </p>
        <MagicDropzone />
      </div>
    </div>
  );
};
