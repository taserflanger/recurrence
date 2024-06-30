import { Handle, Position, useReactFlow} from 'reactflow';
import Latex from 'react-latex-next';

export type EqualityNodeData = {
    status: boolean,
    left: string,
    right: string
};

export function EqualityNode({id, data={status:false, left:"", right:""}}: {id: string, data: any}) {
    const {setNodes} = useReactFlow();
    const updateLeft = (evt: any) => {
        setNodes((nds) => 
            nds.map((n) => {
                if (n.id === id) {
                    return {
                        ...n,
                        data: {...n.data, left: evt.target.value}
                    }
                } return n;
            })
        )
    };
    const updateRight = (evt: any) => {
        setNodes((nds) => 
            nds.map((n) => {
                if (n.id === id) {
                    return {
                        ...n,
                        data: {...n.data, right: evt.target.value}
                    }
                } return n;
            })
        )
    };

    const process = (arg: string) => {
        if (arg.search("sum")!=-1) {
            return arg.replace(/sum\((.+),(.+)\)/, "($1 + \\cdots + $2)")
        }
        arg = arg.replace(/(.*)\/(.*)/, "\\frac\{$1\}\{$2\}")
        arg = arg.replace(/\*/g, "")
        return arg
    }

    return (
    <div className="react-flow__node-default" style={{ padding: '10px 30px 10px 10px', width: "auto"}}>
        <div>Equality</div>

        <Handle
            type="target"
            position={Position.Left}
            onConnect={(params) => console.log("todo "+ params)}
        />
        <div>
            <input value={data.left} onChange={updateLeft} />
            <input value={data.right} onChange={updateRight} />
        </div>
        <Latex>
            ${process(data.left)} = {process(data.right)}$
        </Latex>
        <Handle
            type="source"
            position={Position.Bottom}
        />
    </div>
  )};

