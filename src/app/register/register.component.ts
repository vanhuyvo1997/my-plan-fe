import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: any;
  isSuccessful = false;
  errorMessage = '';
  showResultMessage = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(40)]),

      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),

      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]),
      confirmPassword: new FormControl('',
        [
          Validators.required,
        ]
      )
    }, this.matchingPasswordValidator);
  }

  matchingPasswordValidator: ValidatorFn = (formGroup: AbstractControl) => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if(password === confirmPassword){
      return null;
    } else {
      // formGroup.get('confirmPassword')?.setErrors({matchingPasswordValidator: true});
      return {'missMatch': true};
    }
  };

  onSubmit() {
    const name = this.registerFormGroup.controls['name'].value;
    const email = this.registerFormGroup.controls['email'].value;
    const password = this.registerFormGroup.controls['password'].value;
    const confirmPassword = this.registerFormGroup.controls['confirmPassword'].value

    if (password !== confirmPassword) {
      this.isSuccessful = false;
      return;
    }

    this.authService.register(name, email, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.showResultMessage = true;
        this.ngOnInit();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.showResultMessage = true;
      }
    );
  }

  get name() { return this.registerFormGroup.get('name'); }
  get email() { return this.registerFormGroup.get('email'); }
  get password() { return this.registerFormGroup.get('password'); }
  get confirmPassword() { return this.registerFormGroup.get('confirmPassword'); }
}