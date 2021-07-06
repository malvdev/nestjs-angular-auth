import { TestBed } from '@angular/core/testing';

import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '../../storages';
import { AuthData } from '../models/auth.model';
import { CredentialsService, CREDENTIALS_KEY } from './credentials.service';

describe('CredentialsService', () => {
  let credentialsService: CredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CredentialsService,
        { provide: LocalStorageService, useClass: MemoryStorageService },
        { provide: SessionStorageService, useClass: MemoryStorageService },
      ],
    });

    credentialsService = TestBed.inject(CredentialsService);
  });

  describe('setCredentials', () => {
    it('should authenticate user if credentials are set', () => {
      credentialsService.setCredentials({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(credentialsService.isAuth()).toBe(true);
      expect((<AuthData>credentialsService.credentials).accessToken).toBe(
        'accessToken'
      );
    });

    it('should clean authentication', () => {
      credentialsService.setCredentials();

      expect(credentialsService.isAuth()).toBe(false);
    });

    it('should clear user authentication', () => {
      credentialsService.setCredentials();

      expect(credentialsService.isAuth()).toBe(false);
      expect(credentialsService.credentials).toBeNull();
      expect(credentialsService.storage.getItem(CREDENTIALS_KEY)).toBeNull();
      expect(credentialsService.storage.getItem(CREDENTIALS_KEY)).toBeNull();
    });
  });
});
