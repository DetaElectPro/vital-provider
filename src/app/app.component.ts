import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

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
        private fcm: FCM,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.getFCM();
        });
    }

    getFCM(){
     
        this.fcm.subscribeToTopic('doctor');

        this.fcm.getToken().then(token => {
            localStorage.setItem('fcm_registration_id', token);
        //   console.log(token);
        });
  
        this.fcm.onNotification().subscribe(data => {
          console.log(data);
          if (data.wasTapped) {
            console.log('Received in background');
            // this.router.navigate([data.landing_page, data.price]);
          } else {
            console.log('Received in foreground');
            // this.router.navigate([data.landing_page, data.price]);
          }
        });
  
        this.fcm.onTokenRefresh().subscribe(token => {
          console.log(token);
        });
    }
}
