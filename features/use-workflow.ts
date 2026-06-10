"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Workflow } from "@/lib/generated/prisma/client";
import { encodeAsync } from "zod";

type CreateWorkflowPayload = {
  name: string;
  description?: string;
};

type WorkflowType = {
  id: string;
  name: string;
  flowObject: any;
};

export const useGetWorkflows = () => {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      return await axios
        .get<{ data: Workflow[] }>("/api/workflow")
        .then((res) => res.data.data);
    },
  });
};

export const useCreateWorkflow = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ name, description }: CreateWorkflowPayload) => {
      const response = await axios.post("/api/workflow", { name, description });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Workflow created successfully");
      router.push(`/workflow/${data.data.id}`);
    },
    onError: (error) => {
      console.error("Error creating workflow:", error);
      toast.error("Failed to create workflow");
    },
  });
};

export const useGetWorkflowById = (wordflowId: string) => {
  return useQuery({
    queryKey: ["workflows", wordflowId],
    queryFn: async () => {
      return await axios
        .get<{ data: WorkflowType }>(`/api/workflow/${wordflowId}`)
        .then((res) => res.data.data);
    },
    enabled: !!wordflowId,
  });
};
