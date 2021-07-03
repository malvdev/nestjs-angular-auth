import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AuthService, AUTH_OPTIONS_TOKEN } from '@core/auth';
import { AuthTemplateModule, FieldErrorModule } from '@shared/components';
import { RegisterFormComponent } from './register-form';
import { RegisterComponent } from './register.component';
import { CredentialsService } from '../core/auth/services/credentials.service';
import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '../core/storages';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, RegisterFormComponent],
      imports: [
        HttpClientModule,
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
