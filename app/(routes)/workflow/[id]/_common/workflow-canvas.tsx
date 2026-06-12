import React from "react";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  BackgroundVariant,
  useReactFlow,
} from "@xyflow/react";
import Controls from "@/components/workflow/controls";
import "@xyflow/react/dist/style.css";
import { TOOL_MODE_ENUM, ToolModeType } from "@/constant/workflow";
import { cn } from "@/lib/utils";
import NodePanel from "./node-panel";
import { useWorkflow } from "@/context/workflow-conext";
import { createNode, NodeType } from "@/lib/workflow/node-config";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

const WorkflowCanvas = () => {
  const { view } = useWorkflow();
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [toolMode, setToolMode] = useState<ToolModeType>(TOOL_MODE_ENUM.HAND);

  const isSelectMode = toolMode === TOOL_MODE_ENUM.SELECT;
  const isPreview = view === "preview";

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const node_type = event.dataTransfer.getData(
        "application/reactflow",
      ) as NodeType;

      if (!node_type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = createNode({ type: node_type, position });

      setNodes((nodes) => [...nodes, newNode]);
    },
    [screenToFlowPosition],
  );

  return (
    <div className="relative flex flex-1 h-full overflow-hidden">
      <div className="flex-1 realative h-full">
        <ReactFlow
          className={cn(
            isSelectMode
              ? "cursor-default"
              : "cursor-grab active:cursor-grabbing",
          )}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          panOnDrag={!isSelectMode}
          panOnScroll={!isSelectMode}
          zoomOnScroll={!isSelectMode}
          //nodesDraggable={isSelectMode}
          selectionOnDrag={isSelectMode}
        >
          <Background
            variant={BackgroundVariant.Dots}
            bgColor="var(--sidebar)"
          />
          {!isPreview && <NodePanel />}
          {!isPreview && (
            <Controls toolMode={toolMode} setToolMode={setToolMode} />
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
