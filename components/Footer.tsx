import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

// import React from "react";
interface FooterColumnsProps {
  title: string;
  links: Array<string>;
}
const FooterColumns = ({ title, links }: FooterColumnsProps) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal ">
        {links.map((el, elIdx) => (
          <Link key={el + elIdx} href="/">
            {el}
          </Link>
        ))}
      </ul>
    </div>
  );
};
function Footer() {
  return (
    <footer className="flex-start footer">
      <div className="flex items-start flex-col">
        <Image src="/logo-purple.svg" alt="logo" width={200} height={30} />
        <p className="text-start text-sm font-normal mt-5 max-w-xs">
          Flexibble is the world&apos;s leading community for creatives to
          share, grow, and get hired.
        </p>
      </div>
      <div className="flex flex-wrap gap-12 mt-12">
        {footerLinks.map((el) => (
          <FooterColumns links={el.links} title={el.title} key={el.title} />
        ))}
      </div>
    </footer>
  );
}

export default Footer;
