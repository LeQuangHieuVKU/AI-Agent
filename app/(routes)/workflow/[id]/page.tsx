"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetWorkflowById } from "@/features/use-workflow";
import Header from "./_common/header";
import { Spinner } from "@/components/ui/spinner";
import { WorkflowProvider } from "@/context/workflow-conext";

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: workflow, isPending, isError } = useGetWorkflowById(id);

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner className="size-12 text-primary" />
      </div>
    );
  }

  if (isError || !workflow) return <div>Workflow not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen relative">
        <WorkflowProvider>
          <div className="flex flex-col h-screen relative">
            <Header
              isLoading={false}
              name={workflow?.name}
              workflowId={workflow?.id}
            />
            <div className="flex-1 relative overflow-hidden">
              <></>
            </div>
          </div>
        </WorkflowProvider>
      </div>
    </div>
  );
};

export default Page;
