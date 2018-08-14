import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycommentsComponent } from './mycomments.component';

describe('MycommentsComponent', () => {
  let component: MycommentsComponent;
  let fixture: ComponentFixture<MycommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
