import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishStockComponent } from './replenish-stock.component';

describe('ReplenishStockComponent', () => {
  let component: ReplenishStockComponent;
  let fixture: ComponentFixture<ReplenishStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplenishStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
