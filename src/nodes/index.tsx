import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import 'katex/dist/katex.min.css';
import { LatexNode } from "./latexnode";
import { EqualityNode } from "./equalitynode";
import { AssociativityNode } from "./associativity";
import { ReplaceNode } from "./replace";
import { SimplifyNode } from "./simplify";
import { DefinitionNode } from "./definition";
import { BeginningEqualityNode } from "./beginning_equality";
import { EndEqualityNode } from "./end_equality";

export const initialNodes = [
  {
    id: "0",
    type: "beginning_equality",
    position: { x: 0, y: 200 },
    data: {label: "", left: "sum(1,n)", right: "n*(n+1)/2"}
  },
  {
    id: "1",
    type: "end_equality",
    position: { x: 0, y: 300 },
    data: {label: "objective", left: "(n+1)*(n+2)/2", right: "sum(1,n+1)"}
  },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "latex": LatexNode,
  "equality": EqualityNode,
  "associativity": AssociativityNode,
  "replace": ReplaceNode,
  "simplify": SimplifyNode,
  "definition": DefinitionNode,
  "beginning_equality": BeginningEqualityNode,
  "end_equality": EndEqualityNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
