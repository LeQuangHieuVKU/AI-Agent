import React from "react";
import { createContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Edge, Node } from "@xyflow/react";
import { createNode, NodeTypeEnum } from "@/lib/workflow/node-config";

export type WorkflowView = "edit" | "preview";

interface WorkflowContextTextType {
  view: WorkflowView;
  setView: (view: WorkflowView) => void;
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  getVariablesForNode: (nodeId: string) => {
    id: string;
    label: string;
    outputs: string[];
  }[];
}

const WorkflowContext = createContext<WorkflowContextTextType | undefined>(
  undefined,
);

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const start_node = createNode({
    type: NodeTypeEnum.START,
  });
  const [view, setView] = useState<WorkflowView>("edit");
  const [nodes, setNodes] = useState<Node[]>([start_node]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getUpstreamNodes = (nodeId: string) => {
    const upstream = new Set<string>();
    const addToSet = (id: string) => {
      edges
        .filter((e) => e.target === id)
        .forEach((e) => {
          upstream.add(e.source);
          addToSet(e.source);
        });
    };

    addToSet(nodeId);
    return upstream;
  };

  const getVariablesForNode = (nodeId: string) => {
    const uptreamIds = getUpstreamNodes(nodeId);
    return nodes
      .filter((node) => uptreamIds.has(node.id))
      .map((node) => ({
        id: node.id,
        label: String(node.data.label) || "Unknown",
        outputs: (node.data.outputs as string[]) || [],
      }));
  };

  return (
    <WorkflowContext.Provider
      value={{
        view,
        setView,
        nodes,
        edges,
        setNodes,
        setEdges,
        getVariablesForNode,
      }}
    >
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
