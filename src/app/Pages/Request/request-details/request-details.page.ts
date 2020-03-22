import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, PopoverController} from '@ionic/angular';
import {RequestsService} from '../../../Service/requests.service';
import {Requests} from '../../../Models/requests';
import {DoctorePage} from '../../../doctore/doctore.page';
import {NotificationsComponent} from '../../../components/notifications/notifications.component';
import {FinishRequestComponent} from "../../../components/finish-request/finish-request.component";

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.page.html',
    styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

    // map: Map;
    // propertyList = [];
    result: any;
    requestId: number;
    request: Requests = {
        accept_request: {
            doctor: {active: 0, id: 0, image: '', name: '', phone: '', status: 0},
            doctor_id: 0,
            id: 0,
            note: '',
            rating: 0,
            recommendation: '',
            request_id: 0,
        },
        created_at: '',
        end_time: '',
        id: 0,
        name: '',
        number_of_hour: 0,
        price: 0,
        specialties: {id: 0, medical: {id: 0, name: ''}, name: ''},
        start_time: '',
        status: 0,
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
                message: 'Loading...'
            });
            await loading.present();
            await this.requestServe.getRequestById(this.requestId)
                .subscribe(res => {
                    this.result = res;
                    console.log(this.request = this.result.data);
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            // this.presentAlertConfirm.create()
        }
    }

    acceptRequest() {
        this.requestServe.adminAcceptRequestSpecialists(this.requestId)
            .subscribe(res => {
                    console.log(this.acceptRes = res);
                    if (this.acceptRes.accept) {
                        this.router.navigateByUrl('/history');
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

    cancelRequest() {
        this.requestServe.cancelRequestByAdmin(this.requestId)
            .subscribe(res => {
                    console.log(this.acceptRes = res);
                    if (this.acceptRes.accept) {
                        alert('ok');
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

    requestDone() {

    }


    async notifications(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: FinishRequestComponent,
            event: ev,
            animated: true,
            showBackdrop: true
        });
        return await popover.present();
    }
}
