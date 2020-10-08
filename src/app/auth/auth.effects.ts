import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AuthActionTypes, LogInSuccess, LogInFailure } from './auth.actions';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';
import { ApiService } from '../core/api.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private api: ApiService) {}
  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    delay(1000),
    map((action) => action['payload']),
    mergeMap((payload) =>
      this.api.logIn(payload).pipe(
        map(
          (user) =>
            new LogInSuccess({
              token: user.token,
              firstName: user.firstName,
              lastName: user.lastName,
            })
        ),
        catchError(async (error) => new LogInFailure({ error: error.error }))
      )
    )
  );
}
