import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsCardsComponent } from './dogs-cards.component';

describe('DogsCardsComponent', () => {
  let component: DogsCardsComponent;
  let fixture: ComponentFixture<DogsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
