import {
  Component,
  Input,
  OnInit,
  forwardRef,
  AfterContentChecked,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements OnInit, AfterContentChecked {
  @Input() type: string;
  @Input() labelName: string;
  @Input() iconName: string;
  @Input() controlName: string;
  @Input() onTyping: () => {};

  fieldValue = '';

  constructor() {}

  ngOnInit(): void {
    this.propagateChange(this.fieldValue);
    // console.log('ong ')
  }

  writeValue(value: any): void {
    // console.log('value=',value)
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  ngAfterContentChecked(): void {
    this.propagateChange(this.fieldValue);
    // change pe chalta h
  }
}
