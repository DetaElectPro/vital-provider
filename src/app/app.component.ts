import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FCM} from 'capacitor-fcm';
import {Plugins, PushNotification} from '@capacitor/core';

const {PushNotifications} = Plugins;

const fcm = new FCM();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    result: any;
    topicName = 'admin';
    remoteToken: string;
    private notifications: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.onLoade();
            this.subscribeTo();
            this.getToken();

        });
    }


    onLoade() {
        PushNotifications.addListener('registration', data => {
            // alert(JSON.stringify(data));
            console.log(data);
        });
        PushNotifications.register().then(() =>
            console.log(`registered for push`));
        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotification) => {
                console.log('notification ' + JSON.stringify(notification));
                this.notifications.push(notification);
            }
        );
    }

    subscribeTo() {
        PushNotifications.register()
            .then(_ => {
                fcm
                    .subscribeTo({topic: this.topicName})
                    .then(r => console.log(`subscribed to topic ${this.topicName}`))
                    .catch(err => console.log(err));
            })
            .catch(err => alert(JSON.stringify(err)));
    }

    // unsubscribeFrom() {
    //     fcm
    //         .unsubscribeFrom({topic: 'test'})
    //         .then(r => alert(`unsubscribed from topic ${this.topicName}`))
    //         .catch(err => console.log(err));
    //     if (this.platform.is('android')) {
    //         fcm.deleteInstance();
    //     }
    // }

    getToken() {
        fcm.getToken()
            .then(result => {
                this.remoteToken = result.token;
                localStorage.setItem('fcm_registration_in', result.token);
            })
            .catch(err => console.log(err));
    }
}
