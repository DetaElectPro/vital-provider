import {ApplicationRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  myAccountData: { [k: string]: any } = {};
  password = '';

  constructor(
      public http: HttpClient,
      public platform: Platform,
      public navCtrl: NavController,
      public applicationRef: ApplicationRef) {
  }

  // ============================================================================================
  // function updating user information
  updateInfo = function() {
    this.loading.show();
    if (this.password !== '') {
      this.myAccountData.password = this.password;
    }
    this.config.putAsync('customers/' + this.shared.customerData.id, this.myAccountData).then((data: any) => {
      this.loading.hide();
      this.shared.login(data);
      this.applicationRef.tick();
      this.nav.navigateRoot('/settings');
      this.shared.toast('Data Updated!');
    }, (err) => {
      this.shared.toast('Error Updating Data!');
    });
  };


  ionViewWillEnter() {
    // l
  }

  ngOnInit() {
  }

}
