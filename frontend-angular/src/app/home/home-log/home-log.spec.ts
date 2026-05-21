import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLog } from './home-log';

describe('HomeLog', () => {
  let component: HomeLog;
  let fixture: ComponentFixture<HomeLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
