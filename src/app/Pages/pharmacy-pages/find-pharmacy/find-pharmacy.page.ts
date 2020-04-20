import {Component, OnInit} from '@angular/core';
import {Medicine} from '../../../Models/medicine';
import {EmergencyService} from '../../../Service/emergency.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-find-pharmacy',
  templateUrl: './find-pharmacy.page.html',
  styleUrls: ['./find-pharmacy.page.scss'],
})
export class FindPharmacyPage implements OnInit {
  medicine: Medicine = {company: false, dose: null, type: '', name: ''};
  response: any;

  constructor(
      private pharmacyServ: EmergencyService,
      public loadingController: LoadingController,
      public route: Router,
      public tostMessage: ToastController
  ) {
  }

  ngOnInit() {
  }

  async sendRequest() {
    const loading = this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
    });
    (await loading).present();
    this.pharmacyServ.sendPharmcyRequest(this.medicine)
        .subscribe(async response => {
              this.response = response;
              (await loading).dismiss();
              if (this.response.success) {
                this.route.navigate([`pharmacy-details/${this.response.data.id}`]);
                this.succseMessage(this.response.message);
              } else {
                this.faildMessage();
              }
            },
            async error1 =>
                console.table(error1));
    (await loading).dismiss();

  }

  async succseMessage(messge) {
    const toast = await this.tostMessage.create({
      message: messge,
      duration: 3000,
      color: 'primary',
      position: 'middle'
    });
    toast.present();
  }

  async faildMessage() {
    const toast = await this.tostMessage.create({
      message: 'try again with veiled data',
      duration: 3000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
  }
}
