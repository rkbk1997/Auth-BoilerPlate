import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<{ auth: object }>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((resp) => {
      if (!resp['loggin']) {
        this.router.navigate(['/']);
      }
    });
  }
}
