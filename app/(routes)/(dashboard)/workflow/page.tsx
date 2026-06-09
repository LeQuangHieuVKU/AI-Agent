"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyTitle,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { PlusIcon, WorkflowIcon } from "lucide-react";
import React from "react";
import CreateWorkflowDialog from "../_common/create-workflow";
import { useGetWorkflows } from "@/features/use-workflow";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data, isPending } = useGetWorkflows();
  const workflows = data || [];
  return (
    <div className="min-h-auto">
      <div className="py-4">
        <div className="flex items-center justify-between mb-8">
          <div className="">
            <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
            <p className="text-muted-foreground mt-1">
              Build a chat agent workflow with custom logic and tools
            </p>
          </div>
          <Button>
            <PlusIcon size={18} />
            New Workflow
          </Button>
          <CreateWorkflowDialog />
        </div>

        <div className="">
          {isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-40" />
              ))}
            </div>
          ) : workflows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4">
              {workflows.map((workflow) => (
                <Card
                  key={workflow.id}
                  onClick={() => router.push(`/workflow/$(workflow.id)`)}
                  className="cursor-pointer py-5"
                >
                  <CardContent className="space-y-5">
                    <div>
                      <div className="relative mb-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                          <WorkflowIcon size={22} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-foreground">
                          {workflow.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 text-ellipsis">
                          {workflow.description || "No description provided"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 text-muted-foreground/70 text-xs font-medium">
                      <span>
                        {format(new Date(workflow.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <WorkflowIcon />
                </EmptyMedia>
                <EmptyTitle>No Workflows Found</EmptyTitle>
                <EmptyDescription>
                  You have not created any workflows yet
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
