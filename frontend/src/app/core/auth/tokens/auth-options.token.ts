import { InjectionToken } from '@angular/core';

import { AuthOptions } from '../models/auth.model';

export const AUTH_OPTIONS_TOKEN = new InjectionToken<AuthOptions>('AUTH_OPTIONS_TOKEN');
