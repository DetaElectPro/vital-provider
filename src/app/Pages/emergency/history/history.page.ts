import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  doRefresh(event) {
    this.requestData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  requestData() {
    console.log('00');
  }
}
