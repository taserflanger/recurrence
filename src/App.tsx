import { Connection, OnConnect, ReactFlowProvider} from "reactflow";
import { rationalize, simplify } from "mathjs";

import { useCallback} from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

import "./button.css"

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const {getNodes, getEdges, addNodes} = useReactFlow();
  function checkConnection(connection:Connection) {
    const nodes = getNodes();
    setNodes(nodes)
    const edges = getEdges();
    console.log(nodes)
    let source = connection.source || "-1"
    let sourceNode = nodes.filter(n => n.id===source)[0]
    let target = connection.target || "-1"
    let targetNode = nodes.filter(n => n.id===target)[0]
    console.log(nodes)
    console.log(connection)
    console.log(targetNode)
    console.log(targetNode.type)
    if (targetNode.type != "equality" && targetNode.type != "end_equality") {
      return true
    } else {
      let left = targetNode.data.left
      let right = targetNode.data.right
      console.log(left)
      console.log(right)
      if (sourceNode.type == "associativity") {
        let l = left.replace(/\(/g, "").replace(/\)/g, "")
        let r = right.replace(/\(/g, "").replace(/\)/g, "")
        console.log(l, r)
        if (l===r){
          return true
        }
      }
      if (sourceNode.type == "simplify") {
        console.log(simplify(left).toString(), simplify(right).toString())
        let sourceIndex = edges.filter((e)=>e.target === sourceNode.id).map((e)=>e.source)[0]
        let sourceData = nodes.filter(n=> n.id===sourceIndex)[0].data
        console.log(sourceData)
        try {
          console.log(rationalize(sourceData.left).toString())
          console.log(rationalize(left).toString())
          if (rationalize(sourceData.left).toString() === rationalize(left).toString() && sourceData.right === right) {
            return true
          }
        } catch (error) {
          try {
            console.log(rationalize(sourceData.right).toString())
            if (rationalize(sourceData.right).toString() === rationalize(right).toString() && sourceData.left === left) {
              return true
            }
          } catch (error) {
            console.log(error)
            return false
          }
          return false
        }
      }
      if (sourceNode.type==="definition") {
        if (left==="sum(1,n)+n+1" && right === "sum(1,n+1)") {
          return true
      } else if (right==="sum(1,n)+n+1" && left === "sum(1,n+1)") {
        return true
      }}
      if (sourceNode.type==="replace") {
        console.log(edges)
        let argumentsIndexes = edges.filter((e)=> e.target===sourceNode.id).map((e)=>e.source)
        console.log(argumentsIndexes);
        let replaceBy = nodes.filter(n=>n.id === argumentsIndexes[0])[0].data
        let toReplace = nodes.filter(n=> n.id=== argumentsIndexes[1])[0].data
        console.log(toReplace, replaceBy)
        if (toReplace.left.indexOf(replaceBy.left) != -1) {
          console.log(toReplace, replaceBy)
          let replaceLeft = toReplace.left.replace(replaceBy.left, replaceBy.right)
          console.log(replaceLeft)
          if (targetNode.data.left == replaceLeft && targetNode.data.right == toReplace.right) {
            return true
          }
          if (targetNode.data.right == replaceLeft && targetNode.data.left == toReplace.right) {
            return true
          }
        } else if (toReplace.right.indexOf(replaceBy.right != -1)) {
          console.log(toReplace, replaceBy)
          let replaceLeft = toReplace.right.replace(replaceBy.right, replaceBy.left)
          console.log(replaceLeft)
          if (targetNode.data.left == replaceLeft && targetNode.data.right == toReplace.right) {
            return true
          }
          if (targetNode.data.right == replaceLeft && targetNode.data.left == toReplace.right) {
            return true
          }
        }
      }
    console.log(nodes, edges)
    return false
  }}
  const onConnect: OnConnect = useCallback(
    (connection) => {
      if (checkConnection(connection)){
        setEdges((edges) => addEdge(connection, edges));
      }
      console.log(connection)
    },
    [setEdges]
  );
  const createNode = (type: string)=>{
    let id = getNodes().length.toString()
    let newNode =
    {
      id,
      position: {x: 0, y:150},
      type: type,
      data: {label: "node", left:"", right: ""}
    }
    addNodes(newNode)
  }

  return (
    <>
    <button onClick={()=>createNode("equality")} className="btn-add">Equality</button>
    <button onClick={()=>createNode("associativity")} className="btn-add">Associativity</button>
    <button onClick={()=>createNode("replace")} className="btn-add">Replace</button>
    <button onClick={()=>createNode("simplify")} className="btn-add">Simplify</button>
    <button onClick={()=>createNode("definition")} className="btn-add">Definition</button>
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
    
    
    </>
  );
}

export default function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}
