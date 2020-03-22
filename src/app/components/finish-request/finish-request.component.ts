import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-finish-request',
  templateUrl: './finish-request.component.html',
  styleUrls: ['./finish-request.component.scss'],
})
export class FinishRequestComponent implements OnInit {
  requestDate: { note: '', recommendation: '', rating: '' };

  constructor() {
  }

  ngOnInit() {
  }

  updateInfo() {

  }
}
