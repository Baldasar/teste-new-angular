import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import * as OrderActions from '../../state/order/order.actions';
import * as fromAuthSelectors from '../../state/auth/auth.selectors';
import {
  selectOrderLoading,
  selectOrders,
} from '../../state/order/order.selectors';
import { Order } from '../../core/services/order.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterByIdPipe } from '../../shared/pipes/filter-by-id.pipe';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule, AsyncPipe, FormsModule, FilterByIdPipe],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  filterText: string = '';

  orders$: Observable<Order[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectOrders);
    this.isLoading$ = this.store.select(selectOrderLoading);
  }

  ngOnInit() {
    this.store
      .select(fromAuthSelectors.selectUser)
      .pipe(
        filter((user) => !!user?.id),
        take(1)
      )
      .subscribe((user) => {
        this.store.dispatch(OrderActions.loadOrders({ userId: user.id }));
      });
  }

  ngOnDestroy() {
    this.store.dispatch(OrderActions.clearOrders());
  }
}
