import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit {

  requestData = {
    name: '', address: '', price_per_day: null, type: '', available: null, contact: ''
  };
  private errorMessage: any;
  private requrstResult: any;

  constructor(private router: Router,
              private emergencyServ: EmergencyService,
              public loadingController: LoadingController,
              public toastController: ToastController) {
  }

  ngOnInit() {
  }

  async sendRequest() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'dots'
      
    });
    this.emergencyServ.addEmergency(this.requestData)
        .subscribe(async res => {
              await loading.dismiss();
              console.log('response: ', this.requrstResult = res);
              if (this.requrstResult.success) {
                this.presentToast(this.requrstResult.message);
                this.router.navigate(['/emergency-history']);
              } else {
                this.presentToast(this.requrstResult.message);
              }

            },
            async error1 => {
              await loading.dismiss();
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
