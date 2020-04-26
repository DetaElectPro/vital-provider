import {Component, OnInit, ViewChild} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {AuthService} from '../../Service/auth.service';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    @ViewChild('slide', {static: false}) slide3: any;

    response: any;
    dateSlide: any;
    userInfo: any;
    // styleImage = 'max-height: 250px; height: 250px; max-width:100%;';

    constructor(
        private storage: Storage,
        private iab: InAppBrowser,
        private userServ: AuthService,
        private router: Router,
        public actionSheetController: ActionSheetController
    ) {
    }

    ngOnInit() {
        this.storage.get('userInfo')
            .then(res => {
                console.log('user: ', this.userInfo = res);
            })
            .catch(err => {
                console.log(err);
            });
        this.getDashboardData();
        this.updateFcmToken();
    }

    openCvUpdate() {
        const browser = this.iab.create('http://api.vital-helth.com/profile/' + this.userInfo.id);
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }


    getDashboardData() {
        this.userServ.checkUserService()
            .subscribe(response => {
                this.response = response;
                if (this.response.status === true) {
                } else {
                    alert('filed');
                }
            }, error => {
                console.log('server: ', error);
            });
    }

    updateFcmToken() {
        const data = {
            fcm_registration_id: localStorage.getItem(' fcm_registration_id')
        };
        this.userServ.updateFcmToken(data)
            .subscribe(response => {
                console.log('res: ', response);
                // if (this.response.status === true) {
                // } else {
                //     alert('filed');
                // }
            }, error => {
                console.log('server: ', error);
            });
    }

    // slideHome() {
    //     this.userServ.getSlide()
    //         .subscribe(response => {
    //             this.dateSlide = response;
    //             console.log('res: ', response);
    //         }, error => {
    //             console.log('server: ', error);
    //         });
    // }

    slide_next() {
        this.slide3.slideNext();
    }

    slide_prev() {
        this.slide3.slidePrev();
    }

    async ambulanceActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Ambulances Services',
            buttons: [{
                text: 'Create request',
                icon: 'add-circle-outline',
                handler: () => {
                    this.router.navigate(['/ambulance']);
                }
            }, {
                text: 'browser',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/ambulance-history']);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async pharmacyActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'pharmacy Services',
            buttons: [{
                text: 'Find pharmacy',
                icon: 'assets/icon/pharmacy.svg',
                handler: () => {
                    this.router.navigate(['/find-pharmacy']);
                }
            }, {
                text: 'Last Request',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/pharmacy']);
                }
            }, {
                text: 'Your Request history',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/pharmacy-history']);
                }
            },
                {
                    text: 'Your Accept history',
                    icon: 'list-circle-outline',
                    handler: () => {
                        this.router.navigate(['/accept-pharmacy']);
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

    async emergencyActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Requests Services',
            buttons: [{
                text: 'Browse new requests',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/emergency-pages-request']);
                }
            }, {
                text: 'History',
                icon: 'document-attach-outline',
                handler: () => {
                    // this.router.navigate(['/emergency-pages-history']);
                    alert('available soon');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }


}
