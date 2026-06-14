"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, Code2, MoreHorizontal, Pencil, Play } from "lucide-react";
import React from "react";
import { useWorkflow } from "@/context/workflow-context";

type PropsType = {
  isLoading: boolean;
  name?: string;
  workflowId?: string;
};
const Header = ({ name, isLoading }: PropsType) => {
  const { view, setView } = useWorkflow();
  const tabs = [
    { id: "edit", label: "Edit", icon: Pencil },
    { id: "preview", label: "Preview", icon: Play },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="relative flex h-14 items-center px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/workflow"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </Link>
          <p className="max-w-[36vw] truncate text-sm font-semibold">
            {isLoading ? "Loading..." : name || "Untitled Workflow"}
          </p>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-xl border bg-muted/60 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                    view === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 text-sm font-medium">
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal className="size-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Code2 className="size-4" />
            Code
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
