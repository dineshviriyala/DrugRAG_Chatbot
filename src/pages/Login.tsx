import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Fingerprint, Lock, User } from "lucide-react";

// Hardcoded credentials
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (isLoggedIn === "true") {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error: any) {
      toast.error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        toast.error("Biometric authentication not supported on this device");
        return;
      }

      // For demo purposes, we'll show a message
      // In production, you'd implement full WebAuthn flow
      toast.info("Biometric authentication coming soon");
      
      // Example WebAuthn registration flow (commented out for demo)
      /*
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const publicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: "Drug Discovery AI",
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: email,
          displayName: email,
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
        attestation: "direct"
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });
      */
    } catch (error: any) {
      toast.error(error.message || "Biometric authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Drug Discovery AI
          </h1>
          <p className="text-muted-foreground">Secure Authentication Portal</p>
        </div>

        <Card className="shadow-molecular">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to access the drug discovery assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">
                      <User className="w-4 h-4 inline mr-2" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
                    Demo credentials: username: <strong>admin</strong> | password: <strong>admin123</strong>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    variant="scientific"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleBiometricAuth}
                    disabled={isLoading}
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Biometric Authentication
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <div className="space-y-4 text-center py-8">
                  <p className="text-muted-foreground">
                    Sign up is disabled in demo mode.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please use the login tab with demo credentials.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
