import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, PopoverController} from '@ionic/angular';
import {RequestsService} from '../../../Service/requests.service';
import {Requests} from '../../../Models/requests';
import {DoctorePage} from '../../user-pages/doctore/doctore.page';
import {FinishRequestComponent} from '../../../components/finish-request/finish-request.component';

// import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.page.html',
    styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

    result: any;
    requestId: number;
    request: Requests = {
        accept_request: {
            doctor: {active: null, id: null, image: '', name: '', phone: '', status: null, employ: {cv: null}},
            doctor_id: null,
            id: null,
            note: '',
            rating: null,
            recommendation: '',
            request_id: null,
        },
        created_at: '',
        end_time: '',
        id: null,
        name: '',
        number_of_hour: null,
        price: null,
        specialties: {id: null, medical: {id: null, name: ''}, name: ''},
        start_time: '',
        status: null,
        address: ''
    };

    private acceptRes: any;
    private dataReturned: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private presentAlertConfirm: AlertController,
        private loadingController: LoadingController,
        public router: Router,
        private modalController: ModalController,
        public route: ActivatedRoute,
        // private iab: InAppBrowser,
        private requestServe: RequestsService,
        public popoverCtrl: PopoverController
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
        if (this.route.snapshot.paramMap.get('id') !== 'null') {
            const loading = await this.loadingController.create({
                message: 'Loading...',
                spinner: 'bubbles'
            });
            await loading.present();
            await this.requestServe.getRequestById(this.requestId)
                .subscribe(res => {
                    this.result = res;
                    this.request = this.result.data;
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            // this.presentAlertConfirm.create()
        }
    }

    async acceptRequest() {
        const loading = this.loadingController.create({
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.requestServe.adminAcceptRequestSpecialists(this.requestId)
            .subscribe(async res => {
                    (await loading).dismiss();
                    this.acceptRes = res;
                    if (this.acceptRes.accept) {
                        this.router.navigateByUrl('/history');
                    } else {
                        alert('error');
                    }

                },
                async error => {
                    (await loading).dismiss();
                    this.acceptRes = error;
                    console.log(this.acceptRes);
                }
            );
    }

    async cancelRequest() {
        const loading = this.loadingController.create({
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.requestServe.cancelRequestByAdmin(this.requestId)
            .subscribe(async res => {
                    (await loading).dismiss();
                    this.acceptRes = res;
                    if (this.acceptRes.accept) {
                        alert('ok');
                    } else {
                        alert('error');
                    }

                },
                async error => {
                    (await loading).dismiss();
                    this.acceptRes = error;
                    console.log(this.acceptRes);
                }
            );
    }


    async requestConfirm() {
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
                        this.acceptRequest();
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
                        this.cancelRequest();
                    }
                }
            ]
        });

        await alert.present();
    }


    async openProfile() {
        const modal = await this.modalController.create({
            component: DoctorePage,
            componentProps: {
                doctor: this.request.accept_request.doctor,
                // paramTitle: 'Test Title'
            }
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                console.log(`Modal Sent Data : ${dataReturned}`);
            }
        });

        return await modal.present();
    }

    // openPdf(url) {
    //     const browser = this.iab.create(url);
    //
    //     browser.on('loadstop').subscribe(event => {
    //         browser.insertCSS({code: 'body{color: red;'});
    //     });
    //
    //     browser.close();
    // }

    async requestDone(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: FinishRequestComponent,
            event: ev,
            componentProps: {id: this.requestId},
            animated: true,
            showBackdrop: true,

        });
        popover.onDidDismiss()
            .then((result) => {
                console.log(result);
                this.requestData();
            });
        return await popover.present();
    }

    doRefresh(event) {
        this.requestData();

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }
}
