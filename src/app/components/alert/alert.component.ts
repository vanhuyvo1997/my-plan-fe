import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Alert, AlertType } from '@app/_models/alert';
import { AlertService } from '@app/_services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id: string = 'default-alert';
  @Input() fade: boolean = true;

  alerts: Alert[] = [];
  alertSubcription: Subscription = new Subscription;
  routeSubcription: Subscription = new Subscription;

  ngOnInit(): void {
    this.alertSubcription = this.alertService.onAlert(this.id).subscribe(
      alert => {
        if (!alert.message) {
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        this.alerts.push(alert);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    this.routeSubcription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    })

  }
  removeAlert(alert: Alert): void {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // fade out alert
      (this.alerts.find(x => x === alert) as Alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  constructor(private router: Router, private alertService: AlertService) { }


  ngOnDestroy(): void {
    this.alertSubcription.unsubscribe();
    this.routeSubcription.unsubscribe();
  }



}
