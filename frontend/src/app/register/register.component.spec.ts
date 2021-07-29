import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService, AUTH_OPTIONS_TOKEN } from '@core/auth';
import { AuthTemplateModule, FieldErrorModule } from '@shared/components';
import { CredentialsService } from '@core/auth';
import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '@core/storages';

import { RegisterFormComponent } from './register-form';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, RegisterFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AuthTemplateModule,
        FieldErrorModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        AuthService,
        ToastrService,
        CredentialsService,
        LocalStorageService,
        SessionStorageService,
        MemoryStorageService,
        { provide: AUTH_OPTIONS_TOKEN, useValue: { apiBase: '' } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
