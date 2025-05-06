import { createAction, props } from '@ngrx/store';
import { User } from '../../core/services/auth.service';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loadUserFromStorage = createAction(
  '[Auth] Load User From Storage'
);

export const noUserFound = createAction('[Auth] No User Found');
