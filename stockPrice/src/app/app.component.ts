import { Component, OnDestroy } from '@angular/core';
import { stock } from './Models/stock.model';
import { StockService } from './services/stock.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title="MyApp"
  stocks: stock[] = [];
  private stockPriceSubscription: Subscription | null = null;
 
  constructor(private stockService: StockService) {}
 
  subscribeToStockPrice() {
    if (!this.stockPriceSubscription) {
      this.stockPriceSubscription = this.stockService.getStockPriceUpdates().subscribe({
        next: (stocks) => (this.stocks = stocks),
        error: (err) => console.error('Error receiving stock prices', err),
      });
    }
  }
 
  unsubscribeFromStockPrice() {
    this.stockPriceSubscription?.unsubscribe();
    this.stockPriceSubscription = null;
  }
 
  ngOnDestroy() {
    this.unsubscribeFromStockPrice();
  }
}