import { useState } from "react";
import { Header } from "@/components/Header";
import { KYCVerification } from "@/components/KYCVerification";
import { LendingPools } from "@/components/LendingPools";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Lock, Zap, ArrowRight, Bitcoin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [isKYCVerified, setIsKYCVerified] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'kyc' | 'pools'>('landing');
  const { toast } = useToast();

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
    setWalletAddress("0x742d35Cc6634C0532925a3b8D4c9dC");
    setCurrentView('kyc');
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    });
  };

  const handleKYCComplete = () => {
    setIsKYCVerified(true);
    setCurrentView('pools');
    toast({
      title: "Verification Complete",
      description: "Your identity has been verified. You can now access lending pools.",
    });
  };

  const handleLend = (poolId: string, amount: string) => {
    toast({
      title: "Lending Transaction",
      description: `Successfully lent ${amount} to ${poolId}`,
    });
  };

  const handleBorrow = (poolId: string, amount: string) => {
    toast({
      title: "Borrow Transaction",
      description: `Successfully borrowed ${amount} from ${poolId}`,
    });
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Header 
        onConnectWallet={handleConnectWallet}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === 'landing' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <Badge variant="outline" className="border-primary/20 text-primary">
                  <Zap className="w-3 h-3 mr-1" />
                  Powered by SSI Verification
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Decentralized Lending
                  <br />
                  <span className="text-btc">Powered by Bitcoin</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience privacy-preserving DeFi with Self-Sovereign Identity verification. 
                  Lend and borrow with confidence while maintaining full control of your data.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  variant="gradient" 
                  size="xl"
                  onClick={handleConnectWallet}
                  className="animate-float"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="xl">
                  View Documentation
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold text-primary">$2.4M</h3>
                  <p className="text-muted-foreground">Total Value Locked</p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold text-btc">1,247</h3>
                  <p className="text-muted-foreground">Verified Users</p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold text-success">99.9%</h3>
                  <p className="text-muted-foreground">Uptime</p>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="p-6 space-y-4">
                  <Shield className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">SSI Verification</h3>
                  <p className="text-muted-foreground">
                    Self-Sovereign Identity verification ensures privacy while meeting compliance requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-btc/20 bg-gradient-to-br from-btc/5 to-background">
                <CardContent className="p-6 space-y-4">
                  <Bitcoin className="w-8 h-8 text-btc" />
                  <h3 className="text-xl font-semibold">Bitcoin Native</h3>
                  <p className="text-muted-foreground">
                    Lend and borrow Bitcoin directly with competitive rates and secure smart contracts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-success/20 bg-gradient-to-br from-success/5 to-background">
                <CardContent className="p-6 space-y-4">
                  <TrendingUp className="w-8 h-8 text-success" />
                  <h3 className="text-xl font-semibold">High Yields</h3>
                  <p className="text-muted-foreground">
                    Earn competitive yields on your Bitcoin deposits with transparent, algorithmic rates.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* How it Works */}
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Simple, secure, and decentralized lending powered by SSI verification
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "Connect Wallet", icon: "🔗", desc: "Connect your preferred crypto wallet" },
                  { step: 2, title: "Verify Identity", icon: "🛡️", desc: "Complete SSI verification via Fairway Wallet" },
                  { step: 3, title: "Choose Pool", icon: "🏊", desc: "Select Bitcoin lending pool with best rates" },
                  { step: 4, title: "Start Lending", icon: "💰", desc: "Lend Bitcoin and earn competitive yields" }
                ].map((item) => (
                  <Card key={item.step} className="text-center p-6">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-semibold mb-2">Step {item.step}: {item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'kyc' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Identity Verification</h1>
              <p className="text-muted-foreground">
                Complete your identity verification to access lending pools
              </p>
            </div>
            <KYCVerification 
              onVerificationComplete={handleKYCComplete}
              isVerified={isKYCVerified}
            />
          </div>
        )}

        {currentView === 'pools' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Lending Pools</h1>
              <p className="text-muted-foreground">
                Lend and borrow cryptocurrencies with competitive rates
              </p>
            </div>
            <LendingPools 
              isVerified={isKYCVerified}
              onLend={handleLend}
              onBorrow={handleBorrow}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Sundial Protocol. Built with SSI verification by Fairway.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;