import {Component, OnInit} from '@angular/core';
import {MedicalBoard} from '../../../Models/medical-board';
import {LoadingController} from '@ionic/angular';
import {AuthService} from '../../../Service/auth.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-medical-board',
    templateUrl: './medical-board.page.html',
    styleUrls: ['./medical-board.page.scss'],
})
export class MedicalBoardPage implements OnInit {


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
    private dataResult: any;

    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private medicalServ: AuthService
    ) {
    }

    ngOnInit() {
        this.getMedicalFiled();
    }


    async medicalBsaveData() {
        const loading = this.loadingController.create({
            spinner: 'circular',
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.MedicalBoard.birth_of_date = formatDate(this.MedicalBoard.birth_of_date, 'yyyy-MM-dd', 'en_US');
        this.MedicalBoard.graduation_date = formatDate(this.MedicalBoard.graduation_date, 'yyyy-MM-dd', 'en_US');
        this.MedicalBoard.registration_date = formatDate(this.MedicalBoard.registration_date, 'yyyy-MM-dd', 'en_US');
        // @ts-ignore
        this.MedicalBoard.medical_field_id = this.MedicalBoard.medical_field_id.id;
        this.medicalServ.medicalBoardService(this.MedicalBoard)
            .subscribe(async data => {
                (await loading).dismiss();
                this.dataResult = data;
                if (this.dataResult.success) {
                    this.router.navigate(['/']);
                } else {
                    alert('error try again');
                }
            }, (async err => {
                (await loading).dismiss();
                console.log(err);
            }));
    }

    async getMedicalFiled() {
        const loading = this.loadingController.create({
            spinner: null,
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.medicalServ.medicalFiledService()
            .subscribe(async data => {
                    (await loading).dismiss();
                    this.specialtiesList = data;
                    this.specialtiesList = this.specialtiesList.data;
                },
                async err => {
                    console.log(err);
                    (await loading).dismiss();

                });
    }

    // portChange(event: {
    //     component: IonicSelectableComponent,
    //     value: any
    // }) {
    //     console.log('port:', event.value);
    // }
}
