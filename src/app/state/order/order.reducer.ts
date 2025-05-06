import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';

export interface OrderState {
  orders: any[];
  error: string | null;
  loading: boolean;
}

export const initialState: OrderState = {
  orders: [],
  error: null,
  loading: false,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(OrderActions.addOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.addOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    loading: false,
  })),
  on(OrderActions.addOrderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(OrderActions.clearOrders, (state) => ({
    ...state,
    orders: [],
    error: null,
    loading: false,
  }))
);
