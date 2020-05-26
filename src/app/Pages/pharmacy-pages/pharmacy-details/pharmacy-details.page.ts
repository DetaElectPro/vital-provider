import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
    selector: 'app-pharmacy-details',
    templateUrl: './pharmacy-details.page.html',
    styleUrls: ['./pharmacy-details.page.scss'],
})
export class PharmacyDetailsPage implements OnInit {
    requestId: number;
    result: any;
    pharmacy: any;
    acceptRes: any;
    formCard = false;
    formData = {price: null, address: ''};

    constructor(
        public tostMessage: ToastController,
        private activeRoute: ActivatedRoute,
        private presentAlertConfirm: AlertController,
        private loadingController: LoadingController,
        public router: Router,
        private pharmacyServe: EmergencyService
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
            spinner: 'dots'
        });
        await loading.present();
        await this.pharmacyServe.getPharmcyRequestbyID(this.requestId)
            .subscribe(result => {
                this.result = result;
                this.pharmacy = this.result.data;
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }

    async acceptRequest(data) {
        const loading = this.loadingController.create({
            spinner: 'bubbles',
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.pharmacyServe.updatePharmcyRequest(this.requestId, data)
            .subscribe(async response => {
                    (await loading).dismiss();
                    console.log(this.acceptRes = response);
                    if (this.acceptRes.success) {
                        this.succseMessage(this.acceptRes.message);
                        this.router.navigateByUrl('/');
                    } else {
                        this.faildMessage();
                    }

                },
                async error => {
                    this.acceptRes = error;
                    alert('try later');
                    (await loading).dismiss();
                    console.log(this.acceptRes);
                }
            );
    }

    async emergencyConfirm(data) {
        const alert = await this.presentAlertConfirm.create({
            header: 'Confirm!',
            message: 'Message <strong>Do you want to follow up and agree to the new-request?</strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.acceptRequest(data);
                    }
                }
            ]
        });

        await alert.present();
    }

    pharmacyConfirm() {
        this.formCard = true;
    }

    requestCancel() {
        this.formCard = false;

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
