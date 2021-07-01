import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldErrorModule } from '@shared/components';
import { ForgotFormComponent } from './forgot-form.component';

describe('ForgotFormComponent', () => {
  let component: ForgotFormComponent;
  let fixture: ComponentFixture<ForgotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotFormComponent],
      imports: [ReactiveFormsModule, FieldErrorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with control', () => {
    expect(component.forgotForm.contains('email')).toBeTruthy();
  });

  it('should mark email as invalid if empty value', () => {
    const control = component.forgotForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should show email error if incorrect email', () => {
    const control = component.forgotForm.get('email');
    control?.setValue('test-test.com');
    expect(control?.errors?.email).toBeTruthy();
  });

  it('should mark form as valid if correct email', () => {
    expect(component.forgotForm.valid).toBeFalsy();
    component.forgotForm.get('email')?.setValue('test@test.com');
    expect(component.forgotForm.valid).toBeTruthy();
  });

  it('submitting a form emits a forgot', () => {
    expect(component.forgotForm.valid).toBeFalsy();
    component.forgotForm.get('email')?.setValue('test@test.com');
    expect(component.forgotForm.valid).toBeTruthy();

    let form: any | undefined;
    component.formSubmit.subscribe((value) => (form = value));
    component.onSubmit();

    expect(form?.email).toBe('test@test.com');
  });
});
