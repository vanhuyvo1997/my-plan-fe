import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services/alert.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { UserRoles } from '@app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  afterLoginUrl = '';

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit(): void {
    const afterLoginParam = this.route.snapshot.queryParamMap.get('afterLoginUrl');
    if (afterLoginParam) {
      this.afterLoginUrl = afterLoginParam;
    }
  }

  onSubmit() {
    console.log('hello');
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.onLoginSuccess();
      },
      error: err => {
        this.alertService.error(err.message);
      }
    });
  }

  onLoginSuccess() {
    if (this.afterLoginUrl) {
      console.log(this.afterLoginUrl);
      this.router.navigateByUrl(this.afterLoginUrl);
      return;
    }

    const roles: UserRoles[] = this.authService.getCurrentUserRoles();
    if (roles.includes(UserRoles.ADMIN)) {
      console.log(this.afterLoginUrl);
      this.router.navigate(['/admin']);
      return;
    }
    if (roles.includes(UserRoles.USER)) {
      console.log(this.afterLoginUrl);
      this.router.navigate(['/myplan']);
      return;
    }
  }

}
