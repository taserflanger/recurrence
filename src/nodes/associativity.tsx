import { Handle, Position } from "reactflow";

export function AssociativityNode() {
    return (
    <div className="react-flow__node-default" style={{ padding: '10px 30px 10px 10px' }}>
        <div>Associativity</div>
        <Handle type="source"
            position={Position.Bottom}
            />
    </div>
  )};