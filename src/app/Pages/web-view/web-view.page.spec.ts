import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebViewPage } from './web-view.page';

describe('WebViewPage', () => {
  let component: WebViewPage;
  let fixture: ComponentFixture<WebViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
