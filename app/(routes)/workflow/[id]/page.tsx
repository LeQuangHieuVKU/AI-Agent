"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetWorkflowById } from "@/features/use-workflow";
import Header from "./_common/header";
import { Spinner } from "@/components/ui/spinner";
import { WorkflowProvider } from "@/context/workflow-context";
import WorkflowCanvas from "./_common/workflow-canvas";
import { ReactFlowProvider } from "@xyflow/react";

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: workflow, isPending } = useGetWorkflowById(id);

  if (!workflow && isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        Workflow not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen relative">
        <ReactFlowProvider>
          <WorkflowProvider>
            <div className="flex flex-col h-screen relative">
              <Header
                isLoading={isPending}
                name={workflow?.name}
                workflowId={workflow?.id}
              />
              <div className="flex-1 relative overflow-hidden">
                <WorkflowCanvas />
              </div>
            </div>
          </WorkflowProvider>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Page;
