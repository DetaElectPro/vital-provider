import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-web-view',
    templateUrl: './web-view.page.html',
    styleUrls: ['./web-view.page.scss'],
})
export class WebViewPage implements OnInit {
    data: any;
    username: any;
    password: any;

    constructor() {
    }

    ngOnInit() {
    }

    onCallbackEvent(onLogin: string) {
        
    }
}
