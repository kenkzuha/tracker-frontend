import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar.component';
import { Topbar } from './components/topbar/topbar.component';
import { StatCard } from './components/stat-card/stat-card.component';
import { PortfolioService, Portfolio, Asset } from './portfolio/portfolio.service';
import { PricesService, PriceData } from './prices/prices.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar, Topbar, StatCard, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard implements OnInit {
  isLoading = true;

  portfolio: Portfolio[] = [];
  assets: Asset[] = [];
  prices: { [symbol: string]: PriceData } = {};

  stats: { label: string, value: string, change: string, positive: boolean | null }[] = [
    { label: 'Total Value', value: '$0', change: '...', positive: null },
    { label: 'Total Profit/Loss', value: '$0', change: '...', positive: null },
    { label: 'Best Performer', value: '$0', change: '...', positive: null },
    { label: 'Total Assets', value: '$0', change: 'across 0 markets', positive: null },
  ]

  constructor(private portfolioService: PortfolioService, private pricesService: PricesService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;

    this.portfolioService.getAllPortfolio().subscribe({
      next: (portfolios) => {
        this.portfolio = portfolios;
        this.assets = portfolios.flatMap(p => p.assets);

        if(this.assets.length === 0){
          this.isLoading = false;
          this.cdr.detectChanges();
          return;
        }

        const symbol  = [...new Set(this.assets.map(a => a.symbol))];

        this.pricesService.getPrice(symbol).subscribe({
          next: (pricesArray) => {
            pricesArray.forEach(p => {
              this.prices[p.symbol] = p;
            });

            this.calculateStats();
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) =>  {
            console.log('Failed to fetch prices', err);
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.log('Failed to fetch portfolios', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    })
  }

  calculateStats(): void {
    let totalValue = 0;
    let totalCost = 0;
    let bestSymbol = '';
    let bestChange = -Infinity;

    this.assets.forEach(asset => {
      const price = this.prices[asset.symbol];
      if(!price) return;

      const currentValue = price.price * asset.quantity;
      const costValue = asset.buyPrice * asset.quantity;

      totalValue += currentValue;
      totalCost += costValue;

      if(price.changePercent > bestChange){
        bestChange = price.changePercent;
        bestSymbol = asset.symbol;
      }
    });

    const profitLoss = totalValue - totalCost;
    const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

    const marketTypes = new Set(this.assets.map(a => a.type));

    this.stats = [
      {
        label: 'Total Value',
        value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: `${profitLoss >= 0 ? '▲' : '▼'} ${Math.abs(profitLossPercent).toFixed(2)}% all time`,
        positive: profitLoss >= 0,
      },
      {
        label: 'Total Profit/Loss',
        value: `${profitLoss >= 0 ? '+' : '-'}$${Math.abs(profitLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: `${profitLoss >= 0 ? '▲' : '▼'} from $${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} invested`,
        positive: profitLoss >= 0,
      },
      {
        label: 'Best Performer',
        value: bestSymbol || 'N/A',
        change: bestSymbol ? `${bestChange >= 0 ? '▲' : '▼'} ${Math.abs(bestChange).toFixed(2)}% today` : 'No assets yet',
        positive: bestChange > 0,
      },
      {
        label: 'Total Assets',
        value: `${this.assets.length}`,
        change: `across ${marketTypes.size} market types`,
        positive: null,
      },
    ];
  }

  getAssetCurrentValue(asset: Asset): number {
    const price = this.prices[asset.symbol];
    return price ? price.price * asset.quantity : 0;
  }

  getAssetProfitLoss(asset: Asset): number {
    const currentValue = this.getAssetCurrentValue(asset);
    const costValue = asset.buyPrice * asset.quantity;
    return currentValue - costValue;
  }

  getAssetChangePercent(asset: Asset): number {
    const price = this.prices[asset.symbol];
    return price ? price.changePercent : 0;
  }

  getAssetColor(type: string): string {
    const colors: Record<string, string> = {
      'crypto': 'rgba(247, 147, 26, 0.15)',
      'stock': 'rgba(0, 119, 255, 0.15)',
      'idx': 'rgba(0, 230, 170, 0.15)',
    };
    return colors[type] || 'rgba(255,255,255,0.1)';
  }
}