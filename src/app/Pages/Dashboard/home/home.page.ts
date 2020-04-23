import {Component, OnInit} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {


    response: any;
    dateSlide: any;
    userInfo: any;

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

    async requestActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Requests Services',
            buttons: [{
                text: 'Create requests',
                icon: 'add-circle-outline',
                handler: () => {
                    this.router.navigate(['/new-request']);
                }
            }, {
                text: 'History',
                icon: 'document-attach-outline',
                handler: () => {
                    this.router.navigate(['/history']);
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

    // userInfo: any;
    // response: any;
    // grant: any;
    //
    //
    // constructor(
    //     private storage: Storage,
    //     public router: Router,
    //     private iab: InAppBrowser,
    //     private userServ: AuthService,
    //     public actionSheetController: ActionSheetController
    // ) {
    // }
    //
    // ngOnInit() {
    //     this.storage.get('userInfo')
    //         .then(res => {
    //             console.log('user: ', this.userInfo = res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     this.updateFcmToken();
    //     this.getDashboardData();
    //
    // }
    //
    //
    // openCvUpdate() {
    //     const browser = this.iab.create('http://api.vital-helth.com/profile/' + this.userInfo.id);
    //     browser.on('loadstop').subscribe(event => {
    //             console.log('sus: ', event);
    //         },
    //         error => {
    //             console.log('error: ', error);
    //         });
    // }
    //
    //
    // getDashboardData() {
    //     return this.userServ.checkUserService()
    //         .subscribe(response => {
    //             this.response = response;
    //             console.log('check: ', this.response);
    //
    //             if (this.response.status === true) {
    //                 console.log('check: ', this.response);
    //             } else {
    //                 alert('filed');
    //             }
    //         }, error => {
    //             console.log('server: ', error);
    //         });
    // }
    //
    // updateFcmToken() {
    //     const data = {
    //         fcm_registration_id: localStorage.getItem('fcm_registration_id')
    //     };
    //     return this.userServ.updateFcmToken(data)
    //         .subscribe(response => {
    //             console.log('res: ', response);
    //             // if (this.response.status === true) {
    //             // } else {
    //             //     alert('filed');
    //             // }
    //         }, error => {
    //             console.log('server: ', error);
    //         });
    // }
    //
    //
    // async ambulanceActionSheet() {
    //     const actionSheet = await this.actionSheetController.create({
    //         header: 'Ambulances Services',
    //         buttons: [{
    //             text: 'Create request-specialists-pages',
    //             icon: 'add-circle-outline',
    //             handler: () => {
    //                 this.router.navigate(['/ambulance']);
    //             }
    //         }, {
    //             text: 'browser',
    //             icon: 'list-circle-outline',
    //             handler: () => {
    //                 this.router.navigate(['/ambulance-history']);
    //             }
    //         }, {
    //             text: 'Cancel',
    //             icon: 'close',
    //             role: 'cancel',
    //             handler: () => {
    //                 console.log('Cancel clicked');
    //             }
    //         }]
    //     });
    //     await actionSheet.present();
    // }
    //
    // async requestActionSheet() {
    //     const actionSheet = await this.actionSheetController.create({
    //         header: 'Requests Services',
    //         buttons: [{
    //             text: 'Browse new requests',
    //             icon: 'list-circle-outline',
    //             handler: () => {
    //                 this.router.navigate(['/requests']);
    //             }
    //         }, {
    //             text: 'History',
    //             icon: 'document-attach-outline',
    //             handler: () => {
    //                 this.router.navigate(['/history']);
    //             }
    //         }, {
    //             text: 'Cancel',
    //             icon: 'close',
    //             role: 'cancel',
    //             handler: () => {
    //                 console.log('Cancel clicked');
    //             }
    //         }]
    //     });
    //     await actionSheet.present();
    // }
    //
    // async emergencyActionSheet() {
    //     const actionSheet = await this.actionSheetController.create({
    //         header: 'Requests Services',
    //         buttons: [{
    //             text: 'Browse new requests',
    //             icon: 'list-circle-outline',
    //             handler: () => {
    //                 this.router.navigate(['/emergency-pages-request']);
    //             }
    //         }, {
    //             text: 'History',
    //             icon: 'document-attach-outline',
    //             handler: () => {
    //                 // this.router.navigate(['/emergency-pages-history']);
    //                 alert('available soon');
    //             }
    //         }, {
    //             text: 'Cancel',
    //             icon: 'close',
    //             role: 'cancel',
    //             handler: () => {
    //                 console.log('Cancel clicked');
    //             }
    //         }]
    //     });
    //     await actionSheet.present();
    // }
    //
    // async pharmacyActionSheet() {
    //     const actionSheet = await this.actionSheetController.create({
    //         header: 'pharmacy Services',
    //         buttons: [{
    //             text: 'Find pharmacy',
    //             icon: 'assets/icon/pharmacy.svg',
    //             handler: () => {
    //                 this.router.navigate(['/find-pharmacy']);
    //             }
    //         }, {
    //             text: 'Last request-specialists-pages',
    //             icon: 'list-circle-outline',
    //             handler: () => {
    //                 this.router.navigate(['/pharmacy']);
    //             }
    //         }, {
    //             text: 'Your request-specialists-pages history',
    //             icon: 'list-circle-outline',
    //             handler: () => {
    //                 // this.router.navigate(['/pharmacy']);
    //                 alert('soon');
    //             }
    //         },
    //             {
    //                 text: 'Your Accept history',
    //                 icon: 'list-circle-outline',
    //                 handler: () => {
    //                     // this.router.navigate(['/pharmacy']);
    //                     alert('soon');
    //                 }
    //             }, {
    //                 text: 'Cancel',
    //                 icon: 'close',
    //                 role: 'cancel',
    //                 handler: () => {
    //                     console.log('Cancel clicked');
    //                 }
    //             }]
    //     });
    //     await actionSheet.present();
    // }


}
