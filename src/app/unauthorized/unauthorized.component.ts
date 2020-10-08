import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
})
export class UnauthorizedComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  errorMessage = '';
  params = null;
  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.paramMap.get('message');
    localStorage.removeItem('token');
  }
}
