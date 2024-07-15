"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import type { MenuItem } from "primereact/menuitem";
import { useEffect, useState } from "react";

interface Props {
  items?: MenuItem[];
  home?: MenuItem;
}

const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0]!;
};

const convertBreadcrumb = (title: string): string => {
  let transformedTitle = getPathFromUrl(title);

  transformedTitle = transformedTitle.replace(/-/g, " ");
  const decodedUri = decodeURI(transformedTitle);

  return decodedUri.charAt(0).toUpperCase() + decodedUri.slice(1);
};

export const BreadCrumbs = ({ items, home }: Props) => {
  const pathname = usePathname();
  const homeItem = {
    icon: "pi pi-home",
    url: "/",
    template: (item, options) => (
      <Link
        href={item.url!}
        className={options.className}
        data-pc-section="action"
      >
        <span
          className={`${item.icon} p-menuitem-icon`}
          data-pc-section="icon"
        ></span>
      </Link>
    ),
    ...home,
  } as MenuItem;
  const [breadcrumbs, setBreadcrumbs] = useState<Array<MenuItem> | undefined>(
    undefined
  );

  useEffect(() => {
    if (items !== undefined) {
      setBreadcrumbs(items);
    } else if (pathname) {
      const linkPath = pathname?.includes("#")
        ? pathname?.split("#")[0]?.split("/")
        : pathname?.split("/");
      linkPath?.shift();

      const pathArray: MenuItem[] = [];

      linkPath?.forEach((path, i) => {
        if (path !== "") {
          pathArray.push({
            label: convertBreadcrumb(path),
            url: "/" + linkPath?.slice(0, i + 1).join("/"),
            template: (item, options) => (
              <Link
                href={item.url!}
                className={options.className}
                data-pc-section="action"
              >
                <span className="p-menuitem-text" data-pc-section="label">
                  {item.label}
                </span>
              </Link>
            ),
          });
        }
      });

      setBreadcrumbs(pathArray.filter((p) => p.url !== "/"));
    }
  }, [pathname, items]);

  return (
    <BreadCrumb
      model={breadcrumbs}
      home={homeItem}
      pt={{
        root: {
          className: "max-w-80rem mx-auto border-none border-noround",
        },
      }}
    />
  );
};
