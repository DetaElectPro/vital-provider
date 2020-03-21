import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.pageTabs(ev.detail.value);
  }

  pageTabs(choices) {

    switch (choices) {
      case 'new':
        this.router.navigate(['/new-request']);
        break;

      case 'history':
        this.router.navigate(['/history']);
        break;

      // case 'details':
      //   this.router.navigate(['/request-details']);
      //   break;
    }
  }
}
