import {Component, Input, OnInit} from '@angular/core';
import {RequestsService} from '../../Service/requests.service';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-finish-request',
  templateUrl: './finish-request.component.html',
  styleUrls: ['./finish-request.component.scss'],
})

export class FinishRequestComponent implements OnInit {

  // requestDate: { note: '', recommendation: '', rating: '' };
  note: string;
  recommendation: string;
  rating: number;
  @Input('id') id;
  private errorMessage: any;
  private updateResult: any;

  constructor(private requestServ: RequestsService,
              private popoverController: PopoverController) {
  }

  ngOnInit() {
    // this.events.subscribe(this.rating.eventInfo.topic, () => {
    //   console.log("changed rating", this.rating._rating);
    //   // do your stuff
    // });
  }

  updateInfo() {
    let data = {
      note: this.note,
      recommendation: this.recommendation,
      rating: this.rating
    };
    console.log('note: ', this.note, 'rate: ', this.rating);
    this.requestServ.acceptRequestByAdminAndDone(this.id, data)
        .subscribe(res => {
              console.log(this.updateResult = res);
              if (this.updateResult.accept || this.updateResult.request) {

                this.DismissClick();
              } else {

              }
            },
            error1 => {
              console.log(this.errorMessage = error1);
            });
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

}
