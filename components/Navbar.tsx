// import React from "react";

import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
// import { unstable_getServerSession } from "next-auth";
// import { Link } from "next/navigation";
function Navbar() {
  const seesion = null;
  return (
    <div className="flexBetween navbar">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={200} height={30} />
      </Link>
      <div className="xl:flex hidden gap-7 text-small">
        {NavLinks.map((el) => (
          <Link href={el.href} key={el.key}>
            {el.text}
          </Link>
        ))}
      </div>

      <div className="flex-center">
        {seesion ? (
          <div>
            User Proile Image
            <Link href="/create-project" className="capitalize">
              create Work
            </Link>
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>
    </div>
  );
}

export default Navbar;