import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
    username: '',
    dob: '',
    email: '',
    password: '',
    password2: '',
  });

  error$ = {
    firstName_error: '',
    lastName_error: '',
    email_error: '',
    username_error: '',
    dob_error: '',
    password_error: '',
    password2_error: '',
  };

  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {}

  isvalid(): any {
    if (this.registerForm.value.firstName === '') {
      this.error$.firstName_error = 'Please enter First Name';
      return false;
    } else if (this.registerForm.value.lastName === '') {
      this.error$.lastName_error = 'Please enter Last Name';
      return false;
    } else if (this.registerForm.value.username === '') {
      this.error$.username_error = 'Please select a username!';
      return false;
    } else if (this.registerForm.value.email === '') {
      this.error$.email_error = 'Please enter Email!';
      return false;
    } else if (!this.re.test(this.registerForm.value.email)) {
      this.error$.email_error = 'Please enter a valid email!';
      return false;
    } else if (this.registerForm.value.dob === '') {
      this.error$.dob_error = 'Please enter your DOB!';
      return false;
    } else if (this.registerForm.value.password === '') {
      this.error$.password_error = 'Please create password!';
      return false;
    } else if (!this.passwordregex.test(this.registerForm.value.password)) {
      this.error$.password_error =
        'Password length must be 8 and at least contain one upper case and one lower case character';
      return false;
    } else if (this.registerForm.value.password2 === '') {
      this.error$.password2_error = 'Please confirm your password!';
      return false;
    } else if (
      this.registerForm.value.password2 !== this.registerForm.value.password
    ) {
      this.error$.password2_error = 'Password is not matching!';
      return false;
    } else {
      return true;
    }
  }

  onfocus = (): any => {
    // tslint:disable-next-line: forin
    for (const key in this.error$) {
      this.error$[key] = '';
    }
  };

  onSubmit(): void {
    console.log(this.isvalid());
    if (this.isvalid()) {
      console.log('this is in form: ', this.registerForm.value);
      this.api.register(this.registerForm.value).subscribe((res) => {
        if (!res) {
          alert('User already exists!');
        } else {
          this.router.navigate(['/']);
          console.log(res);
        }
      });
    }
  }
}
