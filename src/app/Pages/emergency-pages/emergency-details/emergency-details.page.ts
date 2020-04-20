import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.page.html',
  styleUrls: ['./emergency-details.page.scss'],
})
export class EmergencyDetailsPage implements OnInit {

  result: any;
  requestId: number;
  emergency: any;
  emergencyData: any;
  private acceptRes: any;

  constructor(
      private activeRoute: ActivatedRoute,
      private presentAlertConfirm: AlertController,
      private loadingController: LoadingController,
      public router: Router,
      private requestServe: EmergencyService
  ) {
    this.activeRoute.params.subscribe(
        params => {
          this.requestId = params.id;
        }
    );
  }


  ngOnInit() {
    this.requestData();
  }

  async requestData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
        spinner: 'bubbles'
    });
    await loading.present();
    await this.requestServe.getRequestById(this.requestId)
        .subscribe(res => {
          this.result = res;
          this.emergency = this.result.data;
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
  }

  acceptRequest() {
    this.requestServe.userRequestEmergency(this.requestId, this.emergencyData)
        .subscribe(res => {
              console.log(this.acceptRes = res);
              if (this.acceptRes.accept) {
                this.router.navigateByUrl('/emergency-pages-history');
              } else {
                alert('error');
              }

            },
            error => {
              this.acceptRes = error;
              console.log(this.acceptRes);
            }
        );
  }

  emergencyCancel() {
    this.requestServe.userCancleRequestEmergency(this.requestId)
        .subscribe(res => {
              console.log(this.acceptRes = res);
              if (this.acceptRes.accept) {
                this.router.navigate(['/']);
              } else {
                alert('server error try again or contact with us');
              }

            },
            error => {
              this.acceptRes = error;
              alert('server Error #r2 contact with us');
              console.log(this.acceptRes);
            }
        );
  }


  async emergencyConfirm() {
    const alert = await this.presentAlertConfirm.create({
      header: 'Confirm!',
      message: 'Message <strong>Do you want to follow up and agree to the request?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            // this.acceptRequest();
          }
        }
      ]
    });

    await alert.present();
  }

  async requestCancel() {
    const alert = await this.presentAlertConfirm.create({
      header: 'Confirm!',
      message: 'Message <strong>Do you want to continue and cancel the order?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            // this.emergencyCancel();
          }
        }
      ]
    });

    await alert.present();
  }


}
