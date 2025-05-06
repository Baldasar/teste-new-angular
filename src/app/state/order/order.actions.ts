import { createAction, props } from '@ngrx/store';
import { Order } from '../../core/services/order.service';

export const loadOrders = createAction(
  '[Order] Load Orders',
  props<{ userId: number }>()
);

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: string }>()
);

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Partial<Order> }>()
);

export const addOrderSuccess = createAction(
  '[Order] Add Order Success',
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
  props<{ error: string }>()
);

export const clearOrders = createAction('[Order] Clear Orders');
