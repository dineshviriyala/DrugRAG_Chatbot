import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddFindings = () => {
  const { toast } = useToast();
  const [findings, setFindings] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!findings.trim()) {
      toast({
        title: "Error",
        description: "Please enter some findings before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Finding Submitted",
      description: "Successfully added new findings to the knowledge graph database.",
    });

    // Reset form
    setFindings("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-primary/10 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Chat
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Add New Findings</h1>
                <p className="text-sm text-muted-foreground">Contribute to the biomedical knowledge graph</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Add New Findings
              </CardTitle>
              <CardDescription>
                Enter new drug discovery findings or research data to add to the knowledge graph
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="findings">Research Findings</Label>
                <Textarea
                  id="findings"
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="Enter your drug discovery findings, research data, compound information, clinical observations, or any relevant biomedical data here..."
                  rows={12}
                  className="resize-none"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  variant="molecular" 
                  size="lg"
                  className="gap-2 min-w-[200px]"
                >
                  <Upload className="h-4 w-4" />
                  Submit Finding
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default AddFindings;