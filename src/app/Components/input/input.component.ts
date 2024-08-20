import {
  Component,
  Input,
  forwardRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements AfterViewInit, OnChanges {
  @Input() type: String = ''; //Tipos: text, search, date, checkbox, radio, file,
  @Input() flexDirection: String | null = null; //Tipos: text, search, date, checkbox, radio, file,
  @Input() label: String = '';
  @Input() placeholder: String|null = '';
  @Input() name: String = ''; //"Obrigatório para radio e checkbox, se não, não funciona"
  @Input() items: String[] = []; //"Obrigatório para radio e checkbox, se não, não funciona"
  @Input() mask: String = '';
  @Input() length: { min?: number; max?: number } = {};
  @Input() setValue: any = '';
  @Input() setDisabled: boolean = false;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  value: any = '';
  fileName: String = '';

  constructor() {}

  ngAfterViewInit() {
    if (this.setValue != '' || this.setValue != null)
      setTimeout(() => {
        this.sendValueToFormGroup(this.setValue);
      }, 0);
  }

  //Form Group Emitter
  checkboxValues: string[] = [];
  formControlBlur: () => void = () => {};
  formControlValue: (value: string | string[]) => void = () => {};
  disabled: boolean = false;

  changeValue(e: any) {
    const value = e.target.value;
    if (this.type == 'checkbox') {
      if (this.checkboxValues.includes(value))
        this.checkboxValues.splice(this.checkboxValues.indexOf(value), 1);
      else this.checkboxValues.push(value);
      this.checkboxValues.sort();
      this.sendValueToFormGroup(this.checkboxValues);
      return;
    }
    this.sendValueToFormGroup(value);
  }

  sendValueToFormGroup(value: any) {
    if (value != null)
      this.value =
        this.type == 'money'
          ? parseFloat(
              value.replace('R$ ', '').replace(',', '.').replaceAll(' ', '')
            )
          : value;

    this.formControlBlur();
    this.valueChanged.emit(!Number.isNaN(this.value) ? this.value : null);
    this.formControlValue(!Number.isNaN(this.value) ? this.value : null);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.formControlValue = fn;
  }

  registerOnTouched(fn: any): void {
    this.formControlBlur = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //Input File Handling
  renameFile() {
    const input: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('fileInput')
    );
    this.fileName = input.files![0].name;
  }

  removeFile() {
    const input: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('fileInput')
    );
    input.value = '';
    this.fileName = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Quando a data mudar, ele reconstruirá a tabela
    if (changes['setValue'])
      if (changes['setValue'].currentValue == undefined) this.setValue = '';
  }

  setNumberLength(maxLength: number | undefined) {
    if (maxLength) return '0'.repeat(maxLength);
    return '00000000000';
  }
}
