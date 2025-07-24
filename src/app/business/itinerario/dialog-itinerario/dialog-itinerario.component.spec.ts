import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItinerarioComponent } from './dialog-itinerario.component';

describe('DialogItinerarioComponent', () => {
  let component: DialogItinerarioComponent;
  let fixture: ComponentFixture<DialogItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogItinerarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
