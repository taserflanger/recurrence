import { Handle, Position } from "reactflow";

export function ReplaceNode() {
    return (
    <div className="react-flow__node-default" style={{ padding: '10px 30px 10px 10px' }}>
        <div>Replace</div>
        <Handle
            type="target"
            id="a"
            position={Position.Top}
        />
        <Handle
            type="target"
            id="b"
            position={Position.Left}
            />
        <Handle type="source"
            position={Position.Bottom}
            />
    </div>
  )};