import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.reducer';
import * as AuthActions from "../../state/auth/auth.actions";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  username: string = 'admin';
  password: string = '123';

  constructor(private store: Store<AuthState>) {}

  onLogin() {
    this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));
  }
}
