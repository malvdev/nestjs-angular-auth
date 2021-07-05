import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@core/auth';
import { CredentialsService } from '@core/auth/services';
import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from 'src/app/core/storages';
import { LogoModule } from '../logo';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, LogoModule],
      declarations: [HeaderComponent],
      providers: [
        AuthService,
        CredentialsService,
        LocalStorageService,
        SessionStorageService,
        MemoryStorageService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
