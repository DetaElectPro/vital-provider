import {Component, OnInit} from '@angular/core';
import {ActionSheetController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/auth.service';
// import {FCM} from 'capacitor-fcm';
// import {Plugins, PushNotification} from '@capacitor/core';
//
// const {PushNotifications} = Plugins;
//
// const fcm = new FCM();
import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';

const {PushNotifications} = Plugins;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    userInfo: any;
    response: any;
    grant: any;

    topicName = 'doctor';
    remoteToken: string;
    private notifications: any;

    constructor(
        private platform: Platform,
        private storage: Storage,
        public router: Router,
        private iab: InAppBrowser,
        private userServ: AuthService,
        public actionSheetController: ActionSheetController
    ) {
        this.getDashboardData();
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(err => {
                console.log(err);
            });
        // this.updateFcmToken();

        this.platform.ready().then(() => {
            // this.onLoade();
            // this.subscribeTo();
            // this.getToken();
            this.fcmFun();
        });
    }


    ionViewDidEnter() {
        if (localStorage.getItem('fcm_registration_id')) {
            this.updateFcmToken();
        }
    }

    openCvUpdate() {
        const browser = this.iab.create('https://medical.detatech.xyz/profile/' + this.userInfo.id);
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
                console.log('check: ', this.response);

                if (this.response.status === true) {
                    console.log('check: ', this.response);
                } else {
                    alert('filed');
                }
            }, error => {
                console.log('server: ', error);
            });
    }

    updateFcmToken() {
        const data = {
            fcm_registration_id: localStorage.getItem('fcm_registration_id')
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


    async ambulanceActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Ambulances Services',
            buttons: [{
                text: 'Create request-specialists-pages',
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

    async requestActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Requests Services',
            buttons: [{
                text: 'Browse new requests',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/requests']);
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
                text: 'Last request-specialists-pages',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/pharmacy']);
                }
            }, {
                text: 'Your request-specialists-pages history',
                icon: 'list-circle-outline',
                handler: () => {
                    // this.router.navigate(['/pharmacy']);
                    alert('soon');
                }
            },
                {
                    text: 'Your Accept history',
                    icon: 'list-circle-outline',
                    handler: () => {
                        // this.router.navigate(['/pharmacy']);
                        alert('soon');
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


    onLoade() {
        PushNotifications.addListener('registration', data => {
            // alert(JSON.stringify(data));
            console.log(data);
        });
        PushNotifications.register().then(() =>
            alert(`registered for push`)
        );
        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotification) => {
                console.log('notification ' + JSON.stringify(notification));
                this.notifications.push(notification);
            }
        );
    }

    // subscribeTo() {
    //     PushNotifications.register()
    //         .then(_ => {
    //             fcm
    //                 .subscribeTo({topic: this.topicName})
    //                 .then(r =>
    //                     alert(`subscribed to topic ${this.topicName}`)
    //                 )
    //                 .catch(err => console.log(err));
    //         })
    //         .catch(err => alert(JSON.stringify(err)));
    // }
    //
    // unsubscribeFrom() {
    //     fcm
    //         .unsubscribeFrom({topic: 'test'})
    //         .then(r => alert(`unsubscribed from topic ${this.topicName}`))
    //         .catch(err => console.log(err));
    //     if (this.platform.is('android')) {
    //         fcm.deleteInstance();
    //     }
    // }
    //
    // getToken() {
    //     fcm
    //         .getToken()
    //         .then(result => {
    //             this.remoteToken = result.token;
    //             localStorage.setItem('fcm-token', result.token);
    //         })
    //         .catch(err => console.log(err));
    // }
    fcmFun() {
        // request-specialists-pages permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermissions().then(result => {
            this.grant = result;
            if (this.grant.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                // Show some error
            }
        });

        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                alert('Push registration success, token: ' + token.value);
            }
        );

        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                alert('Push received: ' + JSON.stringify(notification));
            }
        );

        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                alert('Push action performed: ' + JSON.stringify(notification));
            }
        );
    }

}
