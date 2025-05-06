import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuthSelectors from '../../state/auth/auth.selectors';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardHome implements CanMatch {
  constructor(private router: Router, private store: Store) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromAuthSelectors.selectUser).pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
