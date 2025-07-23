import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Wallet, Sun, Moon, Menu, X } from "lucide-react";

interface HeaderProps {
  onConnectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header = ({ 
  onConnectWallet, 
  isWalletConnected, 
  walletAddress,
  isDarkMode,
  onToggleTheme 
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sundial Protocol
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#markets" className="text-foreground/80 hover:text-foreground transition-colors">
            Markets
          </a>
          <a href="#pools" className="text-foreground/80 hover:text-foreground transition-colors">
            Lending Pools
          </a>
          <a href="#analytics" className="text-foreground/80 hover:text-foreground transition-colors">
            Analytics
          </a>
          <a href="#docs" className="text-foreground/80 hover:text-foreground transition-colors">
            Documentation
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="w-9 h-9"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {isWalletConnected ? (
            <div className="flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
            </div>
          ) : (
            <Button variant="connect" onClick={onConnectWallet}>
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-3">
            <nav className="flex flex-col space-y-3">
              <a href="#markets" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Markets
              </a>
              <a href="#pools" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Lending Pools
              </a>
              <a href="#analytics" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Analytics
              </a>
              <a href="#docs" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Documentation
              </a>
            </nav>
            
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                className="w-9 h-9"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {isWalletConnected ? (
                <div className="flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
              ) : (
                <Button variant="connect" onClick={onConnectWallet} size="sm">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};