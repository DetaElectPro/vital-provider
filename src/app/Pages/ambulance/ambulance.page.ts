import {Component, OnInit} from '@angular/core';
import {icon, Map, marker, tileLayer} from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import {EmergencyService} from '../../Service/emergency.service';
import {ToastController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';


const {Geolocation} = Plugins;

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
        private nativeGeocoder: NativeGeocoder,
        private requesServ: EmergencyService,
        private router: Router,
        private androidPermissions: AndroidPermissions,
        public toastController: ToastController) {
    }


    ngOnInit() {

    }

    async locate() {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coords = coordinates.coords;

        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(this.coords.latitude, this.coords.longitude, options)
            .then((result: NativeGeocoderResult[]) =>
                console.log(JSON.stringify(result[0]))
            )
            .catch((error: any) => console.log(error));

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
            iconSize: [30, 30], // size of the icon
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
            this.getAddress(this.myLatLng.lat, this.myLatLng.lng);

        });
        console.log(this.myLatLng);
        // this.locData.lat = 3.3;
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

    sendRequest() {
        this.requesServ.ambulanceRequest(this.locData)
            .subscribe(response => {
                    this.data = response;
                    if (this.data.success) {
                        this.presentToast(this.data.message);
                        this.router.navigate(['history']);
                    } else {
                        this.presentToast(this.data.message);
                    }
                }
                , error => {
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

    // The function below is added
    getAddress(lat: number, long: number) {
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(lat, long, options).then(results => {
            this.locData.address = Object.values(results[0]).reverse();

        });
    }

// The function below is added
    confirmPickupLocation() {
        const navigationextras: NavigationExtras = {
            state: {
                pickupLocation: this.locData.address
            }
        };
        this.router.navigate(['home'], navigationextras);
    }

}
