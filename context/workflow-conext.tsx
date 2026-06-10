import React from "react";
import { createContext, useState } from "react";
import { cn } from "@/lib/utils";

export type WorkflowView = "edit" | "preview";

interface WorkflowContextTextType {
  view: WorkflowView;
  setView: (view: WorkflowView) => void;
}

const WorkflowContext = createContext<WorkflowContextTextType | undefined>(
  undefined,
);

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<WorkflowView>("edit");

  return (
    <WorkflowContext.Provider value={{ view, setView }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = React.useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
}
