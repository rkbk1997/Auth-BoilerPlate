import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as loginAction from '../auth.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  loading$: Observable<boolean>;

  error$ = {
    username_error: '',
    password_error: '',
  };

  constructor(private fb: FormBuilder, private store: Store<{ auth: object }>) {
    this.store.select('auth').subscribe((resp) => {
      this.loading$ = resp['loading'];
      if (resp['error'] !== null) {
        this.error$[resp['error']['fieldName'] + '_error'] =
          resp['error']['errorMessage'];
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
    }
  }

  isvalid(): boolean {
    if (this.loginForm.value.username === '') {
      this.error$.username_error = 'Username cannot be empty!';
      return false;
    } else if (this.loginForm.value.password === '') {
      this.error$.password_error = 'Password cannot be empty!';
      return false;
    } else {
      return true;
    }
  }

  onfocus(): any {
    console.log('login comp: onfocus ');
    this.error$.password_error = '';
    this.error$.username_error = '';
  }

  onSubmit(): any {
    if (this.isvalid()) {
      this.store.dispatch(new loginAction.LogIn(this.loginForm.value));
      this.error$.username_error = '';
      this.error$.password_error = '';
    }
  }
}
