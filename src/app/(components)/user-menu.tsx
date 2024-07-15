"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useMemo, useRef } from "react";

interface CustomMenuItem extends MenuItem {
  shortcut?: string;
  badge?: number;
}

const itemRenderer = (item: CustomMenuItem) => (
  <div className="p-menuitem-content">
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="p-1 ml-auto text-xs border-1 surface-border border-round surface-100">
          {item.shortcut}
        </span>
      )}
    </a>
  </div>
);

export const DashboardUserMenu = () => {
  const router = useRouter();

  //@ts-ignore
  const items: CustomMenuItem[] = useMemo(() => {
    return [
      {
        label: "Profile",
        items: [
          {
            label: "Account",
            icon: "pi pi-cog",
            template: itemRenderer,
          },
          {
            label: "Notifications",
            icon: "pi pi-bell",
            //@ts-ignore
            badge: 2,
            template: itemRenderer,
          },
          {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: async (event) => {
              // handle logout
            },
          },
        ] satisfies Array<CustomMenuItem>,
      },
      {
        separator: true,
      },
      {
        template: (_, options) => {
          return (
            <button
              onClick={(e) => options.onClick(e)}
              className={classNames(
                options.className,
                "w-full p-link flex flex-column align-items-start p-2 pl-4 text-color hover:surface-200 border-noround gap-2"
              )}
            >
              <Avatar
                // use a placeholder photo from user name if user has no photoURL
                image={`https://ui-avatars.com/api/?name=John+Doe&size=32`}
                className="mr-2"
                shape="circle"
              />
              <div className="flex flex-column align">
                <span className="font-bold">John Doe</span>
                <span className="text-sm">john@example.com</span>
              </div>
            </button>
          );
        },
      },
    ];
  }, []);
  const toast = useRef<Toast>(null);
  const menuLeft = useRef<Menu>(null);
  return (
    <>
      <Toast ref={toast}></Toast>
      <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />

      <Button
        aria-label="User Menu"
        onClick={(event) => menuLeft.current?.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup
        rounded
        text
        size="small"
        className="p-button-icon-only"
        pt={{
          root: {
            className: "user-menu-popup",
          },
        }}
      >
        <Avatar
          image={`https://ui-avatars.com/api/?name=John+Doe&size=32`}
          shape="circle"
          className="w-full h-full"
        />
      </Button>
    </>
  );
};
