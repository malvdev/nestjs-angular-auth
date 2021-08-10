import { isPlatformServer } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';

export const IS_SERVER_PLATFORM = new InjectionToken<boolean>('Is server?', {
  factory() {
    return isPlatformServer(inject(PLATFORM_ID));
  },
});
