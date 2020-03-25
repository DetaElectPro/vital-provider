import {Component, OnInit} from '@angular/core';
import {icon, Map, marker, tileLayer} from 'leaflet';
import {EmergencyService} from '../../Service/emergency.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';


@Component({
    selector: 'app-ambulance',
    templateUrl: './ambulance.page.html',
    styleUrls: ['./ambulance.page.scss'],
})
export class AmbulancePage implements OnInit {
    map: Map;
    myLatLng: any;
    newMarker: any;
    locData = {title: '', address: [], latitude: 0.0, longitude: 0.0};
    data: any;
    Error: any;
    coords: any;

    constructor(
        private requesServ: EmergencyService,
        private router: Router,
        public loadingController: LoadingController,
        private androidPermissions: AndroidPermissions,
        public toastController: ToastController) {
        this.checkPermissions2();
    }


    ngOnInit() {

    }

    ionViewDidEnter() {
        this.leafletMap();
    }

    leafletMap() {
        // In setView add latLng and zoom
        this.map = new Map('mapId').setView([15.59, 32.54], 10);
        tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'DetaTech',
        }).addTo(this.map);

        const dot = icon({
            iconUrl: 'assets/icon/ambulance.png',
            // shadowUrl: 'dot-shadow.png',
            iconSize: [40, 40], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative..
        });

        this.newMarker = marker([15.59, 32.54], {
            draggable: true, autoPan: true, icon: dot
        }).addTo(this.map)
            .bindPopup('Pick your Location<br>.')
            .openPopup();

        this.newMarker.on('dragend', () => {
            this.myLatLng = this.newMarker.getLatLng();
            console.log(this.myLatLng);
            this.locData.latitude = this.myLatLng.lat;
            this.locData.longitude = this.myLatLng.lng;

        });
        console.log(this.myLatLng);
        // this.locData.lat = 3.3;
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

    async sendRequest() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
        });
        await loading.present();
        this.requesServ.ambulanceRequest(this.locData)
            .subscribe(async response => {
                    await loading.dismiss();
                    this.data = response;
                    if (this.data.success) {
                        this.presentToast(this.data.message);
                        this.router.navigate(['history']);
                    } else {
                        this.presentToast(this.data.message);
                    }
                }
                , async error => {
                    await loading.dismiss();
                    this.Error = error;
                    alert('try again');
                }
            );
        console.log(this.locData);
    }

    async presentToast(messge) {
        const toast = await this.toastController.create({
            message: messge,
            duration: 3000,
            color: 'primary',
            position: 'middle'
        });
        toast.present();
    }

    checkPermissions2() {
        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        //     result => console.log('Has permission?', result.hasPermission),
        //     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        // );
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
        ).then(
            result => console.log('Has permission?', result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
        );
        this.androidPermissions.requestPermissions(
            [
                this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
                this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
    }
}
