import {Component, OnInit} from '@angular/core';
import {FileLikeObject, FileUploader} from 'ng2-file-upload';
import {concat} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploadeService} from '../../../Service/file-uploade.service';
import {Storage} from '@ionic/storage';
import {User} from '../../../Models/user';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-image-update',
    templateUrl: './image-update.page.html',
    styleUrls: ['./image-update.page.scss'],
})
export class ImageUpdatePage implements OnInit {
    public fileUploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver = false;
    requestDataForm: FormGroup;
    requestData: any = {name: null, phone: null, email: null};
    userInfo: User;
    updateResponse: any;

    constructor(
        private storage: Storage,
        public router: Router,
        public loadingController: LoadingController,
        public toastController: ToastController,
        private uploadingService: FileUploadeService) {
        this.requestDataForm = new FormGroup({
            name: new FormControl('', [Validators.minLength(1)]),
            image: new FormControl('', [Validators.required, Validators.minLength(1)]),
            phone: new FormControl('', [Validators.required, Validators.minLength(1)]),
            email: new FormControl('', [Validators.minLength(1)]),

        });
    }

    ngOnInit() {
        this.storage.get('userInfo').then(data => {
            this.userInfo = data;
            console.log(this.userInfo);
            this.requestData.phone = this.userInfo.phone;
            this.requestData.email = this.userInfo.email;
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
            formData.append('image', file.rawFile, file.name);
            formData.append('email', this.requestData.email);
            // formData.append('phone', this.requestData.phone);

            requests.push(this.uploadingService.uploadFormData(formData));

        });

        concat(...requests).subscribe(
            async res => {
                await loading.dismiss();
                console.log(res);
                this.updateResponse = res;
                this.storage.set('userInfo', this.updateResponse.user);

                if (!this.updateResponse.error) {
                    this.presentToast(this.updateResponse.message);
                } else {
                    this.errorToast('Error try later');
                }
            },
            async err => {
                await loading.dismiss();
                console.log(err);
            }
        );
    }

    async presentToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 3000,
            color: 'success',
            position: 'middle'
        });
        toast.present();
        this.router.navigate(['/'])
    }

    async errorToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 3000,
            color: 'success',
            position: 'middle'
        });
        toast.present();
        this.router.navigate(['/'])
    }
}
