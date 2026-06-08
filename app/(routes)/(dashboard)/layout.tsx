import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./common/app-sidebar";
import Header from "./common/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full flex-1">
        <Header />
        <div className="w-full px-4 lg:px-0 mx-auto max-w-6xl">{children}</div>
      </main>
    </SidebarProvider>
  );
}
