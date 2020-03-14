import {Component, OnInit} from '@angular/core';
import {Map, latLng, tileLayer, Layer, marker} from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import {RequestsService} from '../../Service/requests.service';

@Component({
    selector: 'app-ambulance',
    templateUrl: './ambulance.page.html',
    styleUrls: ['./ambulance.page.scss'],
})
export class AmbulancePage implements OnInit {

    map: Map;
    myLatLng: any;
    newMarker: any;
    locData = {name: '', address: '', lat: 0.0, lng: 0.0};
    private data: any;
    private Error: any;

    constructor(private requesServ: RequestsService) {
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

    sendRequest() {
        this.requesServ.ambulanceRequest(this.locData)
            .subscribe(response => {
                    console.log('res: ', this.data = response);
                }
                , error => {
                    console.log('error: ', this.Error = error);
                }
            );
        console.log(this.locData);
    }
}
