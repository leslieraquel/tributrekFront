import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActividadComponent } from './dialog-actividad.component';

describe('DialogActividadComponent', () => {
  let component: DialogActividadComponent;
  let fixture: ComponentFixture<DialogActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
