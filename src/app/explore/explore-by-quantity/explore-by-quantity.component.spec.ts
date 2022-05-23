import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreByQuantityComponent } from './explore-by-quantity.component';

describe('ExploreByQuantityComponent', () => {
  let component: ExploreByQuantityComponent;
  let fixture: ComponentFixture<ExploreByQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreByQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreByQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
