import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {IonicSelectableModule} from 'ionic-selectable';
import {MapPageModule} from './Pages/map/map.module';
import {PdfViewerService} from './services/pdf-viewer.service';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {DoctorePageModule} from './doctore/doctore.module';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {FinishRequestComponent} from './components/finish-request/finish-request.component';
import {FormsModule} from '@angular/forms';
import {RatingComponent} from './components/rating/rating.component';

@NgModule({
  declarations: [AppComponent, NotificationsComponent, FinishRequestComponent, RatingComponent],
  entryComponents: [NotificationsComponent, FinishRequestComponent, RatingComponent],
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
    FileTransfer,
    FileOpener,
    File,
    PdfViewerService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
