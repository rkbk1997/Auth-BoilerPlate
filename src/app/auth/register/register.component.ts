import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

  error = {
    message: '',
    show: false
  };

  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isvalid(): any{
    if (this.registerForm.value.firstName === ''){
      this.error.message = 'First Name Must Should Be Filled';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.lastName === '') {
      this.error.message = 'Last Name Must Should Be Filled';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.username === '') {
      this.error.message = 'Username Must Should Be Filled';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.email === '') {
      this.error.message = 'Email Must Should Be Filled';
      this.error.show = true;
      return false;
    }
    else if (!this.re.test(this.registerForm.value.email)){
      this.error.message = 'Email Not Valid';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.dob === '') {
      this.error.message = 'DOB Must Should Be Filled';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.password === ''){
      this.error.message = 'Password Must Should Be Filled';
      this.error.show = true;
      return false;
    }
    else if (!this.passwordregex.test(this.registerForm.value.password)){
      this.error.message = 'Password length must be 8 and at least contain one upper case and one lower case character';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.password2 === '') {
      this.error.message = 'Conform Your Password';
      this.error.show = true;
      return false;
    }
    else if (this.registerForm.value.password2 !== this.registerForm.value.password ) {
      this.error.message = 'Password Not Matched';
      this.error.show = true;
      return false;
    }
    else {
      return true;
    }
  }
  onfocus = (controlName): any => {
    // console.log('this controlname: ', controlName);
    this.error[controlName] = false;
  }

  onSubmit(): void{
    console.log(this.isvalid());
    if (this.isvalid()){
      console.log('this is in form: ', this.registerForm.value);
      this.auth.adduser(this.registerForm.value)
      .subscribe(
        res => {
          if (!res){
            this.error.message = 'User Already Created';
            this.error.show = true;
          }
          else{
            this.router.navigate(['/']);
            console.log(res);
          }
        }
      );
    }
  }
}
