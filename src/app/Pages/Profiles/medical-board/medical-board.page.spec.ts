import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalBoardPage } from './medical-board.page';

describe('MedicalBoardPage', () => {
  let component: MedicalBoardPage;
  let fixture: ComponentFixture<MedicalBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
