import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, X, Upload, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddFindings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    drugName: "",
    compoundId: "",
    molecularFormula: "",
    description: "",
    indication: "",
    mechanism: "",
    clinicalPhase: "",
    sideEffects: [] as string[],
    interactions: [] as string[],
    dosage: "",
    route: "",
    halfLife: "",
    bioavailability: "",
    references: "",
    notes: ""
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentInteraction, setCurrentInteraction] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (field: 'sideEffects' | 'interactions') => {
    const value = field === 'sideEffects' ? currentTag : currentInteraction;
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      if (field === 'sideEffects') {
        setCurrentTag("");
      } else {
        setCurrentInteraction("");
      }
    }
  };

  const removeTag = (field: 'sideEffects' | 'interactions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast({
      title: "Finding Submitted",
      description: `Successfully added ${formData.drugName} to the knowledge graph database.`,
    });

    // Reset form
    setFormData({
      drugName: "",
      compoundId: "",
      molecularFormula: "",
      description: "",
      indication: "",
      mechanism: "",
      clinicalPhase: "",
      sideEffects: [],
      interactions: [],
      dosage: "",
      route: "",
      halfLife: "",
      bioavailability: "",
      references: "",
      notes: ""
    });
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
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Basic Drug Information
              </CardTitle>
              <CardDescription>
                Enter the fundamental details about the drug compound
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="drugName">Drug Name *</Label>
                  <Input
                    id="drugName"
                    value={formData.drugName}
                    onChange={(e) => handleInputChange("drugName", e.target.value)}
                    placeholder="e.g., Aspirin, Penicillin"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compoundId">Compound ID</Label>
                  <Input
                    id="compoundId"
                    value={formData.compoundId}
                    onChange={(e) => handleInputChange("compoundId", e.target.value)}
                    placeholder="e.g., DB00945, CHEMBL25"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="molecularFormula">Molecular Formula</Label>
                <Input
                  id="molecularFormula"
                  value={formData.molecularFormula}
                  onChange={(e) => handleInputChange("molecularFormula", e.target.value)}
                  placeholder="e.g., C9H8O4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the drug and its properties..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Clinical Information */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                Clinical Information
              </CardTitle>
              <CardDescription>
                Clinical applications and development status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="indication">Primary Indication</Label>
                  <Input
                    id="indication"
                    value={formData.indication}
                    onChange={(e) => handleInputChange("indication", e.target.value)}
                    placeholder="e.g., Pain relief, Antibiotic"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicalPhase">Clinical Phase</Label>
                  <Select value={formData.clinicalPhase} onValueChange={(value) => handleInputChange("clinicalPhase", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preclinical">Preclinical</SelectItem>
                      <SelectItem value="phase1">Phase I</SelectItem>
                      <SelectItem value="phase2">Phase II</SelectItem>
                      <SelectItem value="phase3">Phase III</SelectItem>
                      <SelectItem value="approved">FDA Approved</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mechanism">Mechanism of Action</Label>
                <Textarea
                  id="mechanism"
                  value={formData.mechanism}
                  onChange={(e) => handleInputChange("mechanism", e.target.value)}
                  placeholder="Describe how the drug works at the molecular level..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pharmacological Data */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
                Pharmacological Data
              </CardTitle>
              <CardDescription>
                Dosage, administration, and pharmacokinetic properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Typical Dosage</Label>
                  <Input
                    id="dosage"
                    value={formData.dosage}
                    onChange={(e) => handleInputChange("dosage", e.target.value)}
                    placeholder="e.g., 325-650 mg every 4-6 hours"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Route of Administration</Label>
                  <Select value={formData.route} onValueChange={(value) => handleInputChange("route", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="iv">Intravenous</SelectItem>
                      <SelectItem value="im">Intramuscular</SelectItem>
                      <SelectItem value="topical">Topical</SelectItem>
                      <SelectItem value="inhalation">Inhalation</SelectItem>
                      <SelectItem value="sublingual">Sublingual</SelectItem>
                      <SelectItem value="rectal">Rectal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="halfLife">Half-life</Label>
                  <Input
                    id="halfLife"
                    value={formData.halfLife}
                    onChange={(e) => handleInputChange("halfLife", e.target.value)}
                    placeholder="e.g., 2-3 hours"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bioavailability">Bioavailability</Label>
                  <Input
                    id="bioavailability"
                    value={formData.bioavailability}
                    onChange={(e) => handleInputChange("bioavailability", e.target.value)}
                    placeholder="e.g., 68-100%"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side Effects and Interactions */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-destructive"></div>
                Safety Profile
              </CardTitle>
              <CardDescription>
                Known side effects and drug interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Side Effects */}
              <div className="space-y-3">
                <Label>Side Effects</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Enter a side effect..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('sideEffects'))}
                  />
                  <Button type="button" onClick={() => addTag('sideEffects')} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sideEffects.map((effect, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {effect}
                      <button
                        type="button"
                        onClick={() => removeTag('sideEffects', index)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Drug Interactions */}
              <div className="space-y-3">
                <Label>Drug Interactions</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentInteraction}
                    onChange={(e) => setCurrentInteraction(e.target.value)}
                    placeholder="Enter a drug interaction..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('interactions'))}
                  />
                  <Button type="button" onClick={() => addTag('interactions')} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interactions.map((interaction, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {interaction}
                      <button
                        type="button"
                        onClick={() => removeTag('interactions', index)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* References and Notes */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                Additional Information
              </CardTitle>
              <CardDescription>
                References, citations, and additional notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="references">References & Citations</Label>
                <Textarea
                  id="references"
                  value={formData.references}
                  onChange={(e) => handleInputChange("references", e.target.value)}
                  placeholder="List relevant research papers, clinical trials, or other sources..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional observations, ongoing research, or important notes..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
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
        </form>
      </main>
    </div>
  );
};

export default AddFindings;