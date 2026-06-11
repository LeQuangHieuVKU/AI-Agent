import { Panel } from "@xyflow/react";
import React from "react";

const NodePanel = () => {
  return (
    <Panel
      position="top-left"
      className="flex flex-col w-60 top-10! h-fit bg-card shadow-xl pb-5 rounded-lg"
    >
      <div className="flex-1 p-4 space-y-2">
        Node list
      </div>
    </Panel>
  );
};

export default NodePanel;
