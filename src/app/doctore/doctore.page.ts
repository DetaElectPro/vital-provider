import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PdfViewerService} from '../services/pdf-viewer.service';

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
      private pdf: PdfViewerService
  ) {
  }

  ngOnInit() {
    this.doctorData = this.navParams.data.doctor;
  }

  async closeModal() {
    await this.modalController.dismiss('onClosedData');
  }

  download(url, title) {
    this.pdf.download(url, title);
  }
}
