import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesService, ChartData } from '../../prices/prices.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() symbol: string = 'BTC-USD';
  @Input() isDark: boolean = true;
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;

  chart: Chart | null = null;
  isLoading = false;
  activeRange = '1M';

  ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  constructor(private pricesService: PricesService){}

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(): void {
    if(this.chart){
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    if(this.chart){
      this.chart.destroy();
    }
  }

  setRange(range: string): void {
     this.activeRange = range;
     this.loadChart();
  }

  loadChart(): void {
    if (!this.symbol) return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    this.pricesService.getChart(this.symbol, this.activeRange).subscribe({
      next: (response) => {
        const labels = response.data
          .filter(d => d.close !== null)
          .map(d => {
            const date = new Date(d.date);
            if (this.activeRange === '1D') {
              return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          });

        const data = response.data
          .filter(d => d.close !== null)
          .map(d => d.close);

        this.renderChart(labels, data);
      },
      error: (err) => {
        console.error('Chart error', err);
      }
    });
  }

  renderChart(labels: string[], data: number[]): void {
    if(this.chart){
      this.chart.destroy();
    }

    const isPositive = data[data.length - 1] >= data[0];
    const color = isPositive ? "#00e6aa" : '#ff5a5a';
    const colorLight = isPositive ? '#0077ff' : '#ff5a5a';
    const lineColor = this.isDark ? color: colorLight;

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: lineColor,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, lineColor + '30');
            gradient.addColorStop(1, lineColor + '00');
            return gradient;
          },
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (ctx) => `$${ctx.parsed.y?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: this.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              maxTicksLimit: 6,
              font: { size: 11 },
            },
            border: { display: false },
          },
          y: {
            position: 'right',
            grid: {
              color: this.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            },
            ticks: {
              color: this.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              font: { size: 11 },
              callback: (value) => `$${Number(value).toLocaleString()}`,
            },
            border: { display: false },
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      },
    });
  }
}
