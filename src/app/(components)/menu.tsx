"use client";

import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";

import Image from "next/image";

import { DashboardUserMenu } from "./user-menu";

export const DashboardMenu = () => {
  const ItemLinkRenderer = ({ item, url }: { item: MenuItem; url: string }) => (
    <div className="p-menuitem-content">
      <Link className="flex align-items-center p-menuitem-link" href={url}>
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
      </Link>
    </div>
  );

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      template: (item) => <ItemLinkRenderer item={item} url={`/`} />,
    },
    {
      separator: true,
    },
    {
      label: "Events",
      icon: "pi pi-folder-open",
      items: [
        {
          label: "All Events",
          template: (item) => <ItemLinkRenderer item={item} url={`/events`} />,
          icon: "pi pi-database",
        },
        {
          label: "Add a new event",
          icon: "pi pi-plus",
          template: (item) => (
            <ItemLinkRenderer item={item} url={`/events/create`} />
          ),
        },
      ],
    },
  ];

  return (
    <Menubar
      model={menuItems}
      start={
        <Image
          alt="logo"
          src="/vercel.svg"
          height="40"
          width="70"
          className="p-0 m-0"
        />
      }
      end={
        <div className="flex gap-2 align-items-center">
          <InputText
            placeholder="Search"
            type="text"
            className="w-8rem sm:w-auto"
          />
          <DashboardUserMenu />
        </div>
      }
      className="w-full mx-auto max-w-80rem border-none border-noround h-4rem"
      pt={{
        start: {
          className: "mr-3",
        },
      }}
    />
  );
};
