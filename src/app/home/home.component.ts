import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$ = null;

  constructor(
    private router: Router,
    private store: Store<{ auth: object }>,
    private api: ApiService
  ) {
    this.store.select('auth').subscribe((resp) => {
      if (resp['user'] !== null) {
        this.user$ = resp['user']['firstName'] + ' ' + resp['user']['lastName'];
      }
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    } else {
      this.store.select('auth').subscribe((resp) => {
        if (resp['user'] === null) {
          console.log('no user in store!');
          this.api
            .authenticateUser(localStorage.getItem('token'))
            .subscribe((response: any) => {
              console.log('this is server response: ', response);
            });
        }
      });
    }
  }
}
