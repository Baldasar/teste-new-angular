import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from '../../components/order/order.component';
import { FormComponent } from '../../components/form/form.component';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, OrderComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentComponent: string = 'order';

  constructor(private store: Store) {}

  handleComponentChange(component: string) {
    this.currentComponent = component;
  }

  logout() {
    this.store.dispatch(logout());
  }
}
