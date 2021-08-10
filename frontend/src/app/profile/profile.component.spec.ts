import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  AuthService,
  AUTH_OPTIONS_TOKEN,
  CredentialsService,
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '@core';
import {
  DestroyService,
  DetailsCardModule,
  HeaderModule,
  LoaderModule,
} from '@shared';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HeaderModule,
        LoaderModule,
        DetailsCardModule,
      ],
      declarations: [ProfileComponent],
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
