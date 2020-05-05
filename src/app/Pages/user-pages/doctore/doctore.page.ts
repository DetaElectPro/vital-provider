import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-doctore',
    templateUrl: './doctore.page.html',
    styleUrls: ['./doctore.page.scss'],
})
export class DoctorePage implements OnInit {

    doctorData: any;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        // private iab: InAppBrowser,
    ) {
    }

    ngOnInit() {
        this.doctorData = this.navParams.data.doctor;
        // console.log('Doctor: ', this.doctorData);
    }

    async closeModal() {
        await this.modalController.dismiss('onClosedData');
    }


}
