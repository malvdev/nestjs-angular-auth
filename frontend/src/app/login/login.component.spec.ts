import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AUTH_OPTIONS_TOKEN } from '@core/auth';

import { AuthTemplateModule, FieldErrorModule } from '@shared/components';
import { CredentialsService } from '@core/auth/services';
import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '@core/storages';
import { LoginFormComponent } from './login-form';
import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginFormComponent],
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
        CredentialsService,
        LocalStorageService,
        SessionStorageService,
        MemoryStorageService,
        { provide: AUTH_OPTIONS_TOKEN, useValue: { apiBase: '' } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
