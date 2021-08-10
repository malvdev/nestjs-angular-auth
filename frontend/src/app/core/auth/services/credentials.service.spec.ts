import { TestBed } from '@angular/core/testing';

import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
  AuthData,
  CredentialsService,
  CREDENTIALS_KEY,
} from '@core';

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
      const mockCredentials = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      credentialsService.setCredentials(mockCredentials);

      expect(credentialsService.getAuthToken()).toBe(
        mockCredentials.accessToken
      );
      expect((<AuthData>credentialsService.credentials).accessToken).toBe(
        'accessToken'
      );
    });

    it('should clear user authentication', () => {
      credentialsService.setCredentials();

      expect(credentialsService.getAuthToken()).toBeUndefined();
      expect(credentialsService.credentials).toBeNull();
      expect(credentialsService.storage.getItem(CREDENTIALS_KEY)).toBeNull();
    });
  });
});
