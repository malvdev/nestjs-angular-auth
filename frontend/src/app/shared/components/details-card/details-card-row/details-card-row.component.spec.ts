import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCardRowComponent } from './details-card-row.component';

describe('DetailsCardRowComponent', () => {
  let component: DetailsCardRowComponent;
  let fixture: ComponentFixture<DetailsCardRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCardRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
