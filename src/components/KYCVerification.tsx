import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ExternalLink, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface KYCVerificationProps {
  onVerificationComplete: () => void;
  isVerified: boolean;
}

export const KYCVerification = ({ onVerificationComplete, isVerified }: KYCVerificationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'idle' | 'redirecting' | 'processing' | 'complete'>('idle');

  const handleVerification = () => {
    setIsLoading(true);
    setVerificationStep('redirecting');
    
    // Simulate redirect to Fairway wallet
    setTimeout(() => {
      setVerificationStep('processing');
      // Simulate the 10-second verification process
      setTimeout(() => {
        setVerificationStep('complete');
        setIsLoading(false);
        onVerificationComplete();
      }, 10000);
    }, 2000);
  };

  const openFairwayWallet = () => {
    // In a real implementation, this would redirect to the actual Fairway wallet
    window.open('https://wallet.fairway.global', '_blank');
    handleVerification();
  };

  if (isVerified) {
    return (
      <Card className="border border-success/20 bg-gradient-to-br from-success/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-success" />
            <div>
              <h3 className="font-semibold text-success">Verification Complete</h3>
              <p className="text-sm text-muted-foreground">Your identity has been verified via SSI</p>
            </div>
            <Badge variant="outline" className="ml-auto border-success/20 text-success">
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>KYC Verification Required</CardTitle>
              <CardDescription>
                Verify your identity using Self-Sovereign Identity (SSI) to access lending pools
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Decentralized identity verification</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Your data remains in your control</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>One-time verification, multiple use</span>
            </div>
          </div>

          {verificationStep === 'idle' && (
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full"
              onClick={openFairwayWallet}
            >
              <Shield className="w-4 h-4" />
              Verify with Fairway Wallet
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}

          {verificationStep === 'redirecting' && (
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-sm text-muted-foreground">Redirecting to Fairway Wallet...</p>
            </div>
          )}

          {verificationStep === 'processing' && (
            <div className="text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-verification-spin"></div>
                <Shield className="absolute inset-0 w-6 h-6 m-auto text-primary" />
              </div>
              <div className="space-y-2">
                <p className="font-medium">Verifying your credentials...</p>
                <p className="text-sm text-muted-foreground">This process takes approximately 10 seconds</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Processing verification with SSI wallet</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-lg">Why SSI Verification?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Decentralized & Private</h4>
              <p className="text-sm text-muted-foreground">Your personal data never leaves your wallet</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Regulatory Compliance</h4>
              <p className="text-sm text-muted-foreground">Meets KYC requirements while preserving privacy</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Reusable Credentials</h4>
              <p className="text-sm text-muted-foreground">Verify once, use across multiple DeFi protocols</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};