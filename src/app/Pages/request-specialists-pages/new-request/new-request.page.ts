import { Component, OnInit } from '@angular/core';
import { NewRequestModel } from '../../../Models/new-request';
import { MedicalBoard } from '../../../Models/medical-board';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from '../../../Service/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { MapPage } from '../../map/map.page';
import { RequestsService } from '../../../Service/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-new-request',
    templateUrl: './new-request.page.html',
    styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit {

    requrstResult: any;
    requestData: NewRequestModel = {
        address: '',
        end_time: '',
        latitude: null,
        longitude: null,
        medical_id: null,
        name: '',
        number_of_hour: null,
        price: null,
        start_time: ''

    };
    requestDataForm: FormGroup;
    MedicalBoard: MedicalBoard = {
        address: '',
        birth_of_date: '',
        graduation_date: '',
        medical_field_id: null,
        medical_registration_number: '',
        registration_date: '',
        years_of_experience: null
    };
    specialtiesList: any;
    dataReturned: any;
    errorMessage: any;
    minDate: any;

    constructor(
        public modalController: ModalController,
        private medicalServ: AuthService,
        private requestServ: RequestsService,
        private router: Router,
        public toastController: ToastController,
        private loadingController: LoadingController,
    ) {
        this.requestDataForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(1)]),
            end_time: new FormControl('', [Validators.required, Validators.minLength(1)]),
            start_time: new FormControl('', [Validators.required, Validators.minLength(1)]),
            number_of_hour: new FormControl('', [Validators.required, Validators.minLength(1)]),
            medical_id: new FormControl('', [Validators.required, Validators.minLength(1)]),
            price: new FormControl('', [Validators.required, Validators.minLength(1)]),
        });
        this.minDate = new Date(new Date().setDate(new Date().getDate())).toISOString();
    }

    ngOnInit() {
        this.getMedicalFiled();
    }


    async getMedicalFiled() {
        const loading = this.loadingController.create({
            spinner: 'bubbles',
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.medicalServ.medicalFiledService()
            .subscribe(async data => {
                this.specialtiesList = data;
                this.specialtiesList = this.specialtiesList.data;
                (await loading).dismiss();
            },
                async err => {
                    console.log(err);
                    (await loading).dismiss();

                });
    }

    portChange(event: {
        component: IonicSelectableComponent,
        value: any
    }) {
        this.requestData.medical_id = event.value.id;
    }

    async pickLocation() {
        const modal = await this.modalController.create({
            component: MapPage,
            // componentProps: {
            //     // paramID: 123,
            //     // paramTitle: 'Test Title'
            // }
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                console.log(`Modal Sent Data : ${dataReturned}`);
            }
        });

        return await modal.present();
    }

    async sendRequest() {
        const loading = this.loadingController.create({
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.requestData.longitude = this.dataReturned.lng;
        this.requestData.latitude = this.dataReturned.lat;
        this.requestData.address = this.dataReturned.address;
        this.requestData.start_time = formatDate(this.requestData.start_time, 'yyyy-MM-dd', 'en_US');
        this.requestData.end_time = formatDate(this.requestData.end_time, 'yyyy-MM-dd', 'en_US');
        this.requestServ.createRequest(this.requestData)
            .subscribe(async res => {
                (await loading).dismiss();
                console.log('response: ', this.requrstResult = res);
                if (this.requrstResult.success) {
                    this.presentToast(this.requrstResult.message);
                    this.router.navigate(['/history']);
                } else {
                    this.presentToast(this.requrstResult.message);
                }

            },
                async error1 => {
                    (await loading).dismiss();
                    console.log('Error: ', this.errorMessage = error1);
                    this.requrstResult('error try again');
                });
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
}
