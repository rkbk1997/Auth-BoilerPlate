import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import * as loginAction from '../auth.actions';
import * as loginSelector from '../auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error = {
    username_error: '',
    password_error: '',
  };

  errorMessage$ = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<{ auth: object }>
  ) {
    this.store.select('auth').subscribe((resp) => {
      if (resp['error'] === 'Invalid Username') {
        this.error.username_error = resp['error'];
      } else if (resp['error'] === 'Invalid Password') {
        this.error.password_error = resp['error'];
      }
    });
  }

  ngOnInit(): void {}

  isvalid(): boolean {
    if (this.loginForm.value.username === '') {
      this.error.username_error = 'Username Must Should Be Filled';
      return false;
    } else if (this.loginForm.value.password === '') {
      this.error.password_error = 'Password Must Should Be Filled';
    } else {
      return true;
    }
  }

  onfocus = (controlName): any => {
    this.error[controlName] = false;
    this.errorMessage$ = '';
    this.error.password_error = '';
    this.error.username_error = '';
  }

  onSubmit(): any {
    if (this.isvalid()) {
      this.store.dispatch(new loginAction.LoadAuths(this.loginForm.value));
      this.store.pipe(select(loginSelector.getlogin))
        .subscribe((state) => console.log('my dtat', state));
    }
  }
}
