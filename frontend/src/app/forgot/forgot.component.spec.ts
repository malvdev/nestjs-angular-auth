import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
  AuthService,
  AUTH_OPTIONS_TOKEN,
  CredentialsService,
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '@core';
import { AuthTemplateModule, FormFieldModule } from '@shared/components';
import { DestroyService } from '@shared/services';

import { ForgotFormComponent } from './forgot-form';
import { ForgotComponent } from './forgot.component';

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotComponent, ForgotFormComponent],
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
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
