import { Folder, FileCode, FileText, Database, FileJson, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
}

export const projectStructure: FileNode = {
  name: "iris_project",
  type: "folder",
  children: [
    {
      name: "notebooks",
      type: "folder",
      children: [
        { name: "walkthrough.ipynb", type: "file", language: "json" }
      ]
    },
    {
      name: "outputs",
      type: "folder",
      children: [
        { name: ".keep", type: "file", language: "text" }
      ]
    },
    {
      name: "src",
      type: "folder",
      children: [
        { name: "__init__.py", type: "file", language: "python" },
        { name: "model.py", type: "file", language: "python" },
        { name: "train.py", type: "file", language: "python" }
      ]
    },
    {
      name: "tests",
      type: "folder",
      children: [
        { name: "__init__.py", type: "file", language: "python" },
        { name: "test_model.py", type: "file", language: "python" }
      ]
    },
    { name: "LICENSE", type: "file", language: "text" },
    { name: "README.md", type: "file", language: "markdown" },
    { name: "requirements.txt", type: "file", language: "text" }
  ]
};

const FileIcon = ({ name, language }: { name: string; language?: string }) => {
  if (name.endsWith(".md")) return <FileText className="h-4 w-4 text-orange-400" />;
  if (name.endsWith(".py")) return <FileCode className="h-4 w-4 text-blue-400" />;
  if (name.endsWith(".ipynb")) return <FileJson className="h-4 w-4 text-yellow-400" />;
  if (name.endsWith(".txt")) return <FileText className="h-4 w-4 text-gray-400" />;
  if (name === "LICENSE") return <FileText className="h-4 w-4 text-yellow-600" />;
  return <FileText className="h-4 w-4 text-gray-400" />;
};

export function FileTree({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === "file") {
    return (
      <div 
        className="flex items-center gap-2 py-1 hover:bg-accent/50 rounded-sm cursor-default select-none text-sm transition-colors"
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
      >
        <FileIcon name={node.name} language={node.language} />
        <span className="text-muted-foreground group-hover:text-foreground">{node.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="flex items-center gap-1 py-1 hover:bg-accent/50 rounded-sm cursor-pointer select-none text-sm transition-colors group"
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        )}
        <Folder className="h-4 w-4 text-indigo-400 fill-indigo-400/20" />
        <span className="font-medium text-foreground/80 group-hover:text-foreground">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <FileTree key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
