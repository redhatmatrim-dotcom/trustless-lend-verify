import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, TrendingUp, TrendingDown, Zap, DollarSign, Percent } from "lucide-react";
import { useState } from "react";

interface Pool {
  id: string;
  asset: string;
  symbol: string;
  icon: React.ReactNode;
  totalLiquidity: string;
  apr: string;
  utilizationRate: string;
  yourDeposit: string;
  yourBorrow: string;
  maxLTV: string;
  liquidationThreshold: string;
}

interface LendingPoolsProps {
  isVerified: boolean;
  onLend: (poolId: string, amount: string) => void;
  onBorrow: (poolId: string, amount: string) => void;
}

export const LendingPools = ({ isVerified, onLend, onBorrow }: LendingPoolsProps) => {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const pools: Pool[] = [
    {
      id: 'btc-pool',
      asset: 'Bitcoin',
      symbol: 'BTC',
      icon: <Bitcoin className="w-6 h-6 text-btc" />,
      totalLiquidity: '1,234.56',
      apr: '8.45',
      utilizationRate: '75.2',
      yourDeposit: '0.00',
      yourBorrow: '0.00',
      maxLTV: '70',
      liquidationThreshold: '80'
    },
    {
      id: 'eth-pool',
      asset: 'Ethereum',
      symbol: 'ETH',
      icon: <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold">Ξ</div>,
      totalLiquidity: '15,678.90',
      apr: '6.23',
      utilizationRate: '68.7',
      yourDeposit: '0.00',
      yourBorrow: '0.00',
      maxLTV: '75',
      liquidationThreshold: '85'
    }
  ];

  const StatCard = ({ title, value, change, icon, trend }: {
    title: string;
    value: string;
    change?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
  }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-success" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive" />
                )}
                <span className={`text-xs ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Value Locked"
          value="$2.4M"
          change="+12.3%"
          trend="up"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Total Borrowed"
          value="$1.8M"
          change="+8.7%"
          trend="up"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Average APR"
          value="7.34%"
          change="-0.12%"
          trend="down"
          icon={<Percent className="w-5 h-5" />}
        />
        <StatCard
          title="Active Users"
          value="1,247"
          change="+23.4%"
          trend="up"
          icon={<Zap className="w-5 h-5" />}
        />
      </div>

      {/* Pools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Lending Pools</h2>
          <Badge variant="outline" className="border-primary/20 text-primary">
            {pools.length} Pools Available
          </Badge>
        </div>

        <div className="grid gap-4">
          {pools.map((pool) => (
            <Card key={pool.id} className={`transition-all duration-300 hover:shadow-lg ${selectedPool === pool.id ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {pool.icon}
                    <div>
                      <CardTitle className="text-lg">{pool.asset}</CardTitle>
                      <p className="text-sm text-muted-foreground">{pool.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {pool.apr}% APR
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Pool Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Liquidity</p>
                    <p className="font-semibold">{pool.totalLiquidity} {pool.symbol}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Utilization</p>
                    <p className="font-semibold">{pool.utilizationRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Max LTV</p>
                    <p className="font-semibold">{pool.maxLTV}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Liq. Threshold</p>
                    <p className="font-semibold">{pool.liquidationThreshold}%</p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Utilization Rate</span>
                    <span>{pool.utilizationRate}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pool.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Your Position */}
                {isVerified && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Your Position</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deposited</p>
                        <p className="font-medium">{pool.yourDeposit} {pool.symbol}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Borrowed</p>
                        <p className="font-medium">{pool.yourBorrow} {pool.symbol}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  {isVerified ? (
                    <>
                      <Button 
                        variant="gradient" 
                        className="flex-1"
                        onClick={() => onLend(pool.id, '0.1')}
                      >
                        Lend {pool.symbol}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => onBorrow(pool.id, '0.05')}
                      >
                        Borrow {pool.symbol}
                      </Button>
                    </>
                  ) : (
                    <div className="w-full p-3 border border-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        Complete KYC verification to access lending pools
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};