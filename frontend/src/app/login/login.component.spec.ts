import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AUTH_OPTIONS_TOKEN } from '@core/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { AuthTemplateModule, FormFieldModule } from '@shared/components';
import { CredentialsService } from '@core/auth/services';
import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '@core/storages';
import { DestroyService } from '@shared';

import { LoginFormComponent } from './login-form';
import { LoginComponent } from './login.component';

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
        FormFieldModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        DestroyService,
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
