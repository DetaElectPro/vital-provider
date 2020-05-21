import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ModalController, NavController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    userInfo: any;

    constructor(
        private title: Title,
        private storage: Storage,
        private nav: NavController,
        private modal: ModalController,
        private toast: ToastController,
    ) {
    }

    ngOnInit() {
        this.storage.get('userInfo')
            .then(res => {
                console.log('storage: ', this.userInfo = res);
            })
            .catch(erro => {
                alert(erro);
            });
    }

    async presentToast(msg) {
        const toast = await this.toast.create({
            message: msg,
            position: 'bottom',
            duration: 2000,
        });
        toast.present();
    }

    goToEditProfile() {
        return false;
    }

    goBack() {
        this.nav.back();
    }
}
