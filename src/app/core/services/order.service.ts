import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface OrderResponse {
  id: number;
  date_created: string;
  status: number;
  created_by: string;
}

export type Order = OrderResponse;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http.get<Order[]>(`${environment.apiUrl}orders/${id}`);
  }
}
