import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileTree, projectStructure } from "@/components/file-tree";
import { Terminal, Download, Github, Play, FileCode2, BarChart3, ShieldCheck, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/20 rounded-md flex items-center justify-center border border-primary/20">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h1 className="font-semibold text-lg tracking-tight">Iris Classifier Project</h1>
            <Badge variant="secondary" className="font-mono text-xs text-muted-foreground bg-muted/50 border-0">v1.0.0</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Download Project
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar - File Explorer */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">Project Files</h2>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardContent className="p-2">
                <ScrollArea className="h-[400px]">
                  <FileTree node={projectStructure} />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">Quick Actions</h2>
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start gap-2 h-10 border-border/50 bg-card/30 hover:bg-accent/50">
                <Play className="h-4 w-4 text-green-500" />
                Run Training
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-10 border-border/50 bg-card/30 hover:bg-accent/50">
                <FileCode2 className="h-4 w-4 text-blue-500" />
                View Notebook
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-10 border-border/50 bg-card/30 hover:bg-accent/50">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                Run Tests
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - Documentation/Readme */}
        <div className="lg:col-span-9 space-y-8">
          {/* Hero / Intro */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Machine Learning Workflow
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A complete, production-ready Python project structure for the Iris dataset. 
              Includes data processing, model training (Decision Tree), evaluation metrics, and automated testing.
            </p>
          </div>

          <Separator className="bg-border/50" />

          {/* Readme Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                README.md
              </h3>
              <Badge variant="outline" className="font-mono text-xs">markdown</Badge>
            </div>

            <Card className="bg-card border-border/50 shadow-sm overflow-hidden">
              <CardContent className="p-8 prose prose-invert prose-blue max-w-none">
                <h1 className="text-2xl font-bold mb-4">Iris Flower Classifier</h1>
                <p className="text-muted-foreground mb-6">
                  A complete machine learning project structure for training and evaluating a Decision Tree classifier on the Iris dataset.
                </p>

                <h2 className="text-xl font-semibold mb-4 text-foreground">Project Structure</h2>
                <pre className="bg-muted/50 p-4 rounded-lg font-mono text-sm text-muted-foreground mb-6 overflow-x-auto border border-border/50">
{`iris_project/
├── notebooks/          # Jupyter notebooks for exploration
├── outputs/            # Saved models and plots
├── src/                # Source code
│   ├── model.py        # Model definition
│   └── train.py        # Training script
├── tests/              # Unit tests
├── requirements.txt    # Dependencies
└── README.md           # Documentation`}
                </pre>

                <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Start</h2>
                <div className="space-y-4 mb-6">
                  <p className="text-muted-foreground">1. Install dependencies:</p>
                  <div className="bg-muted/50 p-3 rounded-md font-mono text-sm border border-border/50 flex items-center gap-2">
                    <span className="text-primary">$</span> pip install -r requirements.txt
                  </div>
                  
                  <p className="text-muted-foreground">2. Train the model:</p>
                  <div className="bg-muted/50 p-3 rounded-md font-mono text-sm border border-border/50 flex items-center gap-2">
                    <span className="text-primary">$</span> python src/train.py --output-dir outputs/
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-foreground">Features</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">CLI Interface</strong>: Easy-to-use command line interface.</li>
                  <li><strong className="text-foreground">Visualizations</strong>: Automatically generates confusion matrix.</li>
                  <li><strong className="text-foreground">Testing</strong>: Includes unit tests for model logic.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Terminal Preview */}
          <div className="space-y-4">
             <h3 className="text-xl font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5 text-muted-foreground" />
                Example Output
              </h3>
             <Card className="bg-black border-border/50 shadow-lg font-mono text-sm">
                <CardHeader className="border-b border-white/10 py-3 px-4 flex flex-row items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 text-muted-foreground text-xs">bash — python src/train.py</span>
                </CardHeader>
                <CardContent className="p-4 text-gray-300 space-y-1">
                  <div className="flex gap-2">
                    <span className="text-green-500">➜</span>
                    <span>python src/train.py --output-dir outputs/</span>
                  </div>
                  <div className="text-gray-500">Loading data...</div>
                  <div className="text-gray-500">Training model...</div>
                  <div className="text-gray-500">Evaluating...</div>
                  <div className="text-white font-bold">Accuracy: 0.9667</div>
                  <div className="text-gray-500">Model saved to outputs/iris_model.joblib</div>
                  <div className="text-gray-500">Generating confusion matrix...</div>
                  <div className="text-blue-400">Confusion matrix saved to outputs/confusion_matrix.png</div>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
