import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldErrorModule } from '@shared/components';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule, FieldErrorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visible / hidden password', () => {
    expect(component.isShowPassword).toBeFalsy();
    component.onToggleVisiblePassword();
    expect(component.isShowPassword).toBeTruthy();
  });

  it('should have fields of type password', () => {
    expect(component.getPasswordType()).toBe('password');
  });

  it('should have fields of type text', () => {
    component.onToggleVisiblePassword();
    expect(component.getPasswordType()).toBe('text');
  });

  it('should create form with 3 controls', () => {
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('name')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
  });

  it('should mark email as invalid if empty value', () => {
    const control = component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should show email error if incorrect email', () => {
    const control = component.registerForm.get('email');
    control?.setValue('test-test.com');
    expect(control?.errors?.email).toBeTruthy();
  });

  it('should mark name as invalid if empty value', () => {
    const control = component.registerForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should mark password as invalid if empty value', () => {
    const control = component.registerForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should mark the password as invalid if the value is less than 8 characters', () => {
    const control = component.registerForm.get('password');
    control?.setValue('123456');
    expect(control?.errors?.minlength).toBeTruthy();
  });

  it('should mark form as valid if correct email, name and password', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.get('email')?.setValue('test@test.com');
    component.registerForm.get('name')?.setValue('admin');
    component.registerForm.get('password')?.setValue('123456789');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('submitting a form emits a register', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.get('email')?.setValue('test@test.com');
    component.registerForm.get('name')?.setValue('admin');
    component.registerForm.get('password')?.setValue('123456789');
    expect(component.registerForm.valid).toBeTruthy();

    let form: any | undefined;
    component.formSubmit.subscribe((value) => (form = value));
    component.onSubmit();

    expect(form?.email).toBe('test@test.com');
    expect(form?.name).toBe('admin');
    expect(form?.password).toBe('123456789');
  });
});
