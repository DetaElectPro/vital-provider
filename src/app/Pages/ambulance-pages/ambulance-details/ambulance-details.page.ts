import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, AlertController, LoadingController} from '@ionic/angular';
import {AmbulanceService} from '../../../Service/ambulance.service';
import {Map, marker, tileLayer} from 'leaflet';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-ambulance-details',
  templateUrl: './ambulance-details.page.html',
  styleUrls: ['./ambulance-details.page.scss'],
})
export class AmbulanceDetailsPage implements OnInit {

  map: Map;
  result: any;
  params: any;
  requestId: number;
  request: any;
  acceptRes: any;
  userInfo: any;

  constructor(
      private route: ActivatedRoute,
      private presentAlertConfirm: AlertController,
      private loadingController: LoadingController,
      public router: Router,
      public actionSheetController: ActionSheetController,
      public storage: Storage,
      private requestServe: AmbulanceService) {
    this.route.params.subscribe(
        params => {
          this.requestId = params.id;
        }
    );

    this.route.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  ngOnInit() {
    // this.userID = user.id;
    this.requestData();
    this.getUserInfo();
  }

  getUserInfo() {
    this.storage.get('userInfo')
        .then(res => {
          this.userInfo = res;
        })
        .catch(err => {
          console.log(err);
        });
  }

  async requestData() {
    if (this.params.id !== 'null') {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.requestServe.getAmbulanceByIdService(this.requestId)
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

  cancelRequest() {
    this.requestServe.cancelRequestByUser(this.requestId)
        .subscribe(res => {
              console.log(this.acceptRes = res);
              if (this.acceptRes.accept) {
                this.router.navigate(['/']);
              } else {
                alert('server error try again or contact with us');
              }

            },
            error => {
              this.acceptRes = error;
              alert('server Error #r2 contact with us');
              console.log(this.acceptRes);
            }
        );
  }

  ionViewDidEnter() {
    this.map = new Map('mapId').setView([this.params.latitude, this.params.longitude], 20);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      // tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'detaTech.xyz'
    }).addTo(this.map);
    this.leafletMap();
  }

  leafletMap() {
    marker([this.params.latitude, this.params.longitude]).addTo(this.map)
        .bindPopup('location')
        .openPopup();
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  async userAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      buttons: [{
        text: 'Delete',
        icon: 'add-circle-outline',
        handler: () => {
          alert('#a1');
        }
      }, {
        text: 'Edit',
        icon: 'list-circle-outline',
        handler: () => {
          alert('#2');
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
