import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  requestData = {
    name: '', address: '', price_per_day: 0, type: '', available: 0, contact: ''
  };
  private errorMessage: any;
  private requrstResult: any;

  constructor(private router: Router,
              private emergencyServ: EmergencyService,
              public toastController: ToastController) {
  }

  ngOnInit() {
  }

  sendRequest() {
    console.log('send: ', this.requestData);
    this.emergencyServ.addEmergency(this.requestData)
        .subscribe(res => {
              console.log('response: ', this.requrstResult = res);
              if (this.requrstResult.success) {
                this.presentToast(this.requrstResult.message);
                this.router.navigate(['/emergency-history']);
              } else {
                this.presentToast(this.requrstResult.message);
              }

            },
            error1 => {
              console.log('Error: ', this.errorMessage = error1);
              this.presentToast('error try again');
            });
  }


  async presentToast(messge) {
    const toast = await this.toastController.create({
      message: messge,
      duration: 3000,
      color: 'primary',
      position: 'middle'
    });
    toast.present();
  }

  goTo() {
    this.router.navigate(['/emergency-history']);

  }
}
