import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable } from 'rxjs';
import { stock } from '../Models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: stock[] = [
    { name: 'Bajaj Finserve', price: 1600 },
    { name: 'Aimstron Ele', price: 440 },
  ];

  getStockPriceUpdates(): Observable<stock[]> {
    return interval(1000).pipe(
      map(() => {
        this.updateStockPrices();
        return [...this.stocks];
      })
    );
  }

  private updateStockPrices() {
    this.stocks.forEach((stock) => {
      const randomNumber = (Math.random() * 4-2)/100;
      stock.price = parseFloat((stock.price * (1 + randomNumber)).toFixed(2))
    });
  }

}
