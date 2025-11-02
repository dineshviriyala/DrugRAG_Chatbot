import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatInterface from '@/components/ChatInterface';
import heroBackground from '@/assets/hero-bg.jpg';
import { Brain, Database, Search, Zap, Plus, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="relative bg-gradient-scientific">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-molecular-pulse">
                Drug Discovery AI Assistant
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90">
                Powered by RAG + Knowledge Graphs
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Brain className="h-3 w-3" />
                  <span>Contextual AI</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Database className="h-3 w-3" />
                  <span>Knowledge Graphs</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Search className="h-3 w-3" />
                  <span>RAG Search</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Zap className="h-3 w-3" />
                  <span>Real-time Analysis</span>
                </Badge>
              </div>
              <div className="mt-6 flex gap-3 justify-center">
                <Link to="/add-findings">
                  <Button variant="molecular" size="lg" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Findings
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
              <p className="text-sm opacity-75 max-w-2xl mx-auto mt-4">
                Advanced drug discovery platform combining retrieval-augmented generation 
                with biomedical knowledge graphs for intelligent research assistance
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="container mx-auto px-4 py-6">
        <Card className="h-[600px] bg-gradient-card shadow-molecular overflow-hidden">
          <ChatInterface />
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <div className="container mx-auto px-4">
          <p>
            Team: Kameshvar Balan V, Moksh Udeshi, Viriyala Dinesh | 
            BCSE497J - Drug Discovery and Development using RAG
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;