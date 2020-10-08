import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AuthActionTypes } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginSuccessEffect {
  constructor(private action$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.action$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigate(['/home']);
    })
  );
}
