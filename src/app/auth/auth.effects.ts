import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as loginActions from './auth.actions';
import { AuthService } from './auth.service';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService) {}
  @Effect()
  abc$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.AuthActionTypes.LoadAuths),
    mergeMap((action) =>
      this.auth.login(action['payload']).pipe(
        map((data) => new loginActions.LoadAuthsSuccess({ data })),
        catchError((err) =>
          of(new loginActions.LoadAuthsFailure({ error: err.error }))
        )
      )
    )
  );
}
