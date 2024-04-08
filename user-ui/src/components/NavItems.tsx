import Link from "next/link";
import React from "react";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About us",
    url: "/about",
  },
  {
    title: "Restaurants",
    url: "/restaurants",
  },
  {
    title: "Popular Foods",
    url: "/foods",
  },
  {
    title: "Contact us",
    url: "/contact",
  },
];

const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
  return (
    <div className="md:block hidden">
      {navItems.map((item, index) => (
        <Link
          className={`px-5 text-[18px] font-Poppins font-[500] ${
            activeItem === index && "text-[#37b668]"
          }`}
          key={index}
          href={item.url}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
