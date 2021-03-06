import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FileUploadeService } from 'src/app/Service/file-uploade.service';
import { concat } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerData: any = { name: '', phone: '', password: '', role: 3, fcm_registration_id: null, image: null };

    result: any;
    showPass = false;
    passIcon = 'eye-outline';


    public fileUploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver = false;
    constructor(
        private route: Router,
        public toastController: ToastController,
        public activatedRoute: ActivatedRoute,
        private authService: FileUploadeService,
        public loadingController: LoadingController
    ) { }

    ngOnInit() {
        this.registerData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }

    getFiles(): FileLikeObject[] {
        return this.fileUploader.queue.map((fileItem) => {
            return fileItem.file;
        });
    }

    async userRegister() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'bubbles',
            translucent: true
        });

        await loading.present();
        const files = this.getFiles();
        const requests = [];
        files.forEach((file) => {
            const formData = new FormData();
            formData.append('image', file.rawFile, file.name);
            formData.append('name', this.registerData.name);
            formData.append('phone', this.registerData.phone);
            formData.append('password', this.registerData.password);
            formData.append('role', this.registerData.role);

            requests.push(this.authService.registerServes(formData));

        });

        concat(...requests).subscribe(
            async response => {
                await loading.dismiss();
                this.result = response;
                if (this.result.error) {
                    alert(`Message: ${this.result.message}`);
                } else {
                    this.toLogin();
                }
            },
            async err => {
                await loading.dismiss();
                const errs = JSON.parse(err.responseText);
                console.log('serve Error: ', errs);
            });
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            color: 'primary',
            position: 'middle'
        });
        toast.present();
        this.route.navigate(['/'])
    }

    async toLogin() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                role: this.registerData.role,
            }
        };
        await this.route.navigate(['/login'], navigationExtras);
    }

    showPassword() {
        this.showPass = !this.showPass;
        if (this.passIcon === 'eye-outline') {
            this.passIcon = 'eye-off-outline';
        } else {
            this.passIcon = 'eye-outline';
        }
    }
}
