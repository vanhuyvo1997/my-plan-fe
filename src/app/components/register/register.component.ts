import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services/alert.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { first } from 'rxjs';

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
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formRegister.addValidators(this.matchingPasswordValidator);
  }

  getInputValidateClass(formControlName: string): string {
    const formControl = this.formRegister.get(formControlName);
    return formControl?.touched || formControl?.dirty ? (formControl.invalid ? 'is-invalid' : 'is-valid') : '';
  }

  onSubmit() {
    const { name, email, password } = this.formRegister.value;
    this.authService.register(name, email, password).pipe(first()).subscribe(
      {
        next: _data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: _error => {
          this.alertService.error(_error.message);
        }
      }
    );
  }

  get name() { return this.formRegister.get('name'); }
  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }
  get confirmPassword() { return this.formRegister.get('confirmPassword'); }
}
