import type { NodeProps } from "reactflow";
import { Handle, Position } from 'reactflow';
import Latex from 'react-latex-next';

export type LatexNodeData = {
  label: string;
};

export function LatexNode({data}: NodeProps<LatexNodeData>) {
  return (
    <div className="react-flow__node-default" style={{ padding: '10px 20px' }}>
      <Handle
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <Latex macros={{ "\\f": "#1f(#2)" }}>
        ${data.label + "\\f\\relax{x} = x"}$
      </Latex>
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  )};

