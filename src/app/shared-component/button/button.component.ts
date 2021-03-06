import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() btnname: string;
  @Input() type: string;
  @Input() formname: string;

  constructor() { }

  ngOnInit(): void {
  }

}
