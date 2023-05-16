import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeInvoiceService {
  InvoiceType = new BehaviorSubject<string>('');

  constructor() { }

  
}
