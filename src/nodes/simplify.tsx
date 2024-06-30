import { Handle, Position } from "reactflow";

export function SimplifyNode() {
    return (
    <div className="react-flow__node-default" style={{ padding: '10px 30px 10px 10px' }}>
        <div>Simplify</div>
        <Handle type="target"
            position={Position.Top}/>
        <Handle type="source"
            position={Position.Bottom}
            />
    </div>
  )};