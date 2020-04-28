import { Component, OnInit } from '@angular/core';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { concat } from 'rxjs';
import { Storage } from '@ionic/storage';
import { FileUploadeService } from '../../../Servies/file-uploade.service';
import { MedicalBoard } from 'src/app/Models/medical-board';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-cv-update',
    templateUrl: './cv-update.page.html',
    styleUrls: ['./cv-update.page.scss'],
})
export class CvUpdatePage implements OnInit {

    public fileUploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver = false;
    requestDataForm: FormGroup;
    medicalData: MedicalBoard;
    updateResponse: any;
    userInfo: any;
    constructor(
        private storage: Storage,
        public router: Router,
        public loadingController: LoadingController,
        public toastController: ToastController,
        private uploadingService: FileUploadeService) {
        this.requestDataForm = new FormGroup({
            cv: new FormControl('', [Validators.required, Validators.minLength(1)]),
            // medical_registration_number: new FormControl('', [Validators.minLength(1)]),
            // graduation_date: new FormControl('', [Validators.minLength(1)]),
            // birth_of_date: new FormControl('', [Validators.minLength(1)]),
            // registration_date: new FormControl('', [Validators.minLength(1)]),
            // address: new FormControl('', [Validators.minLength(1)]),
            // years_of_experience: new FormControl('', [Validators.minLength(1)]),
            // medical_field_id: new FormControl('', [Validators.minLength(1)])
        });
    }

    ngOnInit() {
        this.storage.get('userInfo').then(data => {
            this.userInfo = data;
            console.log(this.userInfo);
        }).catch(error => {
            console.log(error);
        });
    }

    getFiles(): FileLikeObject[] {
        return this.fileUploader.queue.map((fileItem) => {
            return fileItem.file;

        });
    }

    async uploadFiles() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'dots'
        });
        await loading.present();
        const files = this.getFiles();
        const requests = [];

        files.forEach((file) => {
            const formData = new FormData();
            formData.append('userId', this.userInfo.id);
            formData.append('cv', file.rawFile, file.name);

            requests.push(this.uploadingService.uploadFormData(formData));

        });

        concat(...requests).subscribe(
            async res => {
                await loading.dismiss();
                console.log(res);
                this.updateResponse = res;
                if (!this.updateResponse.error) {
                    this.presentToast(this.updateResponse.message)
                }
                else {
                    alert('Error');
                }
            },
            async err => {
                await loading.dismiss();
                console.log(err);
            }
        );
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            color: 'primary',
            position: 'middle'
        });
        toast.present();
        this.router.navigate(['/'])
    }
}
