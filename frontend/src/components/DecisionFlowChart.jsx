import { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

export default function DecisionFlowChart({ steps }) {
  const initialNodes = steps.map((step, i) => ({
    id: `node-${step.stepNumber}`,
    position: { x: 250, y: i * 120 },
    data: { label: `Step ${step.stepNumber}: ${step.chosenOption || 'Start'}` },
    type: i === 0 ? 'input' : (i === steps.length - 1 ? 'output' : 'default'),
    style: { 
      background: 'rgba(255, 255, 255, 0.03)', 
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#f8fafc',
      width: 280,
      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.3)'
    }
  }));

  const initialEdges = steps.slice(0, -1).map((step, i) => ({
    id: `edge-${i}`,
    source: `node-${step.stepNumber}`,
    target: `node-${steps[i+1].stepNumber}`,
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  }));

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, __, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[500px] border border-white/5 rounded-3xl overflow-hidden bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="z-10"
      >
        <Controls className="!bg-white/5 !border-white/10 !fill-white" />
        <MiniMap zoomable pannable nodeColor="rgba(99, 102, 241, 0.5)" maskColor="rgba(0,0,0,0.8)" style={{ backgroundColor: '#050505' }} />
        <Background variant="dots" gap={16} size={1} color="rgba(255, 255, 255, 0.1)" />
      </ReactFlow>
    </div>
  );
}
