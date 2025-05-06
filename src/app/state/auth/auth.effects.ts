import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) => {
            alert(response.message);
            this.localStorageService.setItem('user', response.user);
            return AuthActions.loginSuccess({
              user: response.user,
            });
          }),
          catchError(() =>
            of(AuthActions.loginFailure({ error: 'Login Failed' }))
          )
        )
      )
    );
  });

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  loadUserFromStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserFromStorage),
      map(() => {
        const user = this.localStorageService.getItem('user');

        if (user) {
          return AuthActions.loginSuccess({ user });
        } else {
          return AuthActions.noUserFound();
        }
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.localStorageService.removeItem('user');
        this.router.navigate(['/login']);
      })
    );
  }, { dispatch: false });
}
