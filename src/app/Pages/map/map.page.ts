import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Map, tileLayer, marker} from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';

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
        // In setView add latLng and zoom
        this.map = new Map('mapId').setView([15.59, 32.54], 10);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'DetaTech',
        }).addTo(this.map);
        this.newMarker = marker([15.59, 32.54], {
            draggable: true, autoPan: true
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
