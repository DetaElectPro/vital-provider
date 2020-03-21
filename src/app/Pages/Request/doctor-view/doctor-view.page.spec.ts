import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorViewPage } from './doctor-view.page';

describe('DoctorViewPage', () => {
  let component: DoctorViewPage;
  let fixture: ComponentFixture<DoctorViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
