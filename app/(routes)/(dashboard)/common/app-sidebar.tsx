"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { WorkflowIcon, Settings } from "lucide-react";
const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    { title: "Workflows", url: "/workflow", icon: WorkflowIcon },
    { title: "Settings", url: "/settings", icon: Settings },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-4">
        <Logo />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              onClick={() => router.push(item.url)}
            >
              <SidebarMenuButton
                isActive={pathname === item.url}
                className="data-[active=true]:bg-primary/10"
                onClick={() => router.push(item.url)}
              >
                <item.icon className="size-4" />
                <span className="font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
