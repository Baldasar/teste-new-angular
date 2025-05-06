import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import * as OrderActions from './order.actions';
import { environment } from '../../../environments/environment';

import { OrderResponse, OrderService } from '../../core/services/order.service';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);

  constructor(
    private http: HttpClient,
    private orderService: OrderService
  ) {}

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap((action) => {
        return this.orderService.get(action.userId).pipe(
          map((orders) => {
            return OrderActions.loadOrdersSuccess({ orders });
          }),
          catchError(() => {
            return of(
              OrderActions.loadOrdersFailure({ error: 'Load Orders Failed' })
            );
          })
        );
      })
    );
  });

  addOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.addOrder),
      mergeMap(({ order }) =>
        this.http
          .post<OrderResponse>(`${environment.apiUrl}orders`, order)
          .pipe(
            map((newOrder) =>
              OrderActions.addOrderSuccess({ order: newOrder })
            ),
            catchError(() =>
              of(OrderActions.addOrderFailure({ error: 'Add Order Failed' }))
            )
          )
      )
    );
  });
}
