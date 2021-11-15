import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  matchingPasswordValidator: ValidatorFn = (formGroup: AbstractControl) => {
    const { password, confirmPassword } = formGroup.value;
    return password === confirmPassword ? null : { notMatch: true }
  }

  formRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formRegister.addValidators(this.matchingPasswordValidator);
  }

  getInputValidateClass(formControlName: string): string {
    const formControl = this.formRegister.get(formControlName);
    return formControl?.touched || formControl?.dirty ? (formControl.invalid ? 'is-invalid' : 'is-valid') : '';
  }

  onSubmit() {

  }

  get name() { return this.formRegister.get('name'); }
  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }
  get confirmPassword() { return this.formRegister.get('confirmPassword'); }
}
