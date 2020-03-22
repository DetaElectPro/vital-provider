import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historyData: any;

  constructor(private router: Router) {
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

  goTo() {
    this.router.navigate(['/emergency-request']);
  }
}
