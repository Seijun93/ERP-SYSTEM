import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionComponent } from './create-transaction.component';

describe('CreateTransaktionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
