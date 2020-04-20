import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {IonicSelectableModule} from 'ionic-selectable';
import {MapPageModule} from './Pages/map/map.module';
import {PdfViewerService} from './Service/pdf-viewer.service';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {DoctorePageModule} from './Pages/user-pages/doctore/doctore.module';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {FinishRequestComponent} from './components/finish-request/finish-request.component';
import {FormsModule} from '@angular/forms';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {TokenInterceptor} from './interceptors/token.interceptor';


export function tokenGetter() {
    return localStorage.getItem('token');
}

export function jwtOptionsFactory() {
    return {
        tokenGetter: () => {
            return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:8101'],
        blacklistedDomain: ['localhost:8101/login'],
        throwNoTokenError: true
    };
}

@NgModule({
    declarations: [AppComponent, NotificationsComponent, FinishRequestComponent],
    entryComponents: [NotificationsComponent, FinishRequestComponent],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        MapPageModule,
        DoctorePageModule,
        IonicSelectableModule, FormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        FCM,
        NativeGeocoder,
        AndroidPermissions,
        FileTransfer,
        FileOpener,
        File,
        PdfViewerService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }

    ],
    exports: [],
    bootstrap: [AppComponent]
})
// ionic capacitor run android --livereload --watch --prod  --external
export class AppModule {
}

