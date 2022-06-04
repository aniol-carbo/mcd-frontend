import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreByPriceComponent } from './explore-by-price.component';

describe('ExploreByPriceComponent', () => {
  let component: ExploreByPriceComponent;
  let fixture: ComponentFixture<ExploreByPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreByPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreByPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
