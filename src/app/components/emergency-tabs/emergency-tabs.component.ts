import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emergency-tabs',
  templateUrl: './emergency-tabs.component.html',
  styleUrls: ['./emergency-tabs.component.scss'],
})
export class EmergencyTabsComponent implements OnInit {

  @Input() name: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    // this.name = ev.detail.value;
    this.pageTabs(ev.detail.value);
  }

  pageTabs(choices) {

    switch (choices) {
      case 1:
        console.log('new');
        this.router.navigate(['/emergency-request']);
        break;

      case 2:
        console.log('req');
        this.router.navigate(['/emergency-history']);
        break;

        // case 'details':
        //   this.router.navigate(['/request-details']);
        //   break;
    }
  }
}
