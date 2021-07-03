import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldErrorModule } from '@shared/components';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule, FieldErrorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 2 controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should mark email as invalid if empty value', () => {
    const control = component.loginForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should show email error if incorrect email', () => {
    const control = component.loginForm.get('email');
    control?.setValue('test-test.com');
    expect(control?.errors?.email).toBeTruthy();
  });

  it('should mark email as valid if correct email', () => {
    const control = component.loginForm.get('email');
    control?.setValue('test@test.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should mark password as invalid if empty value', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should mark form as valid if correct email and password', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.get('email')?.setValue('test@test.com');
    component.loginForm.get('password')?.setValue('123456789');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('submitting a form emits a auth', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.get('email')?.setValue('test@test.com');
    component.loginForm.get('password')?.setValue('123456789');
    expect(component.loginForm.valid).toBeTruthy();

    let form: any | undefined;
    component.formSubmit.subscribe((value) => (form = value));
    component.onSubmit();

    expect(form?.email).toBe('test@test.com');
    expect(form?.password).toBe('123456789');
  });
});
