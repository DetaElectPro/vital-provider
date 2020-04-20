import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {icon, Map, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    map: Map;
    myLatLng: any;
    newMarker: any;
    locData = {address: '', lat: 0.0, lng: 0.0};

    constructor(
        private modalController: ModalController,
        // private navParams: NavParams
    ) {
    }

    ngOnInit() {
        // console.table(this.navParams);
        // this.modelId = this.navParams.data.paramID;
        // this.modalTitle = this.navParams.data.paramTitle;
    }

    async closeModal() {
        await this.modalController.dismiss(this.locData);
    }

    async ionViewDidEnter() {
        await this.leafletMap();
    }

    leafletMap() {
        const dot = icon({
            iconUrl: 'assets/images/pin.png',
            // shadowUrl: 'dot-shadow.png',
            iconSize: [35, 50], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative..
        });

        // In setView add latLng and zoom
        this.map = new Map('mapId').setView([15.59, 32.54], 10);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'DetaTech',
        }).addTo(this.map);
        this.newMarker = marker([15.59, 32.54], {
            draggable: true, autoPan: true, icon: dot
        }).addTo(this.map)
            .bindPopup('Pick your Location<br>.')
            .openPopup();

        this.newMarker.on('dragend', () => {
            this.myLatLng = this.newMarker.getLatLng();
            console.log(this.myLatLng);
            this.locData.lat = this.myLatLng.lat;
            this.locData.lng = this.myLatLng.lng;

        });
        console.log(this.myLatLng);
        // this.locData.lat = 3.3;
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

}
