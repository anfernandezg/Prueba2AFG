import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeginSesionPage } from './begin-sesion.page';

describe('BeginSesionPage', () => {
  let component: BeginSesionPage;
  let fixture: ComponentFixture<BeginSesionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
