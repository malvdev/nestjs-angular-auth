import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  CanActivate,
  Resolve,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NEVER, Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { anything, instance, mock, when } from 'ts-mockito';

import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let resolveMock: Resolve<any>;
  let canActivateMock: CanActivate;
  let routes: Routes = [];
  let router: Router;
  let ngZone: NgZone;
  let fixture: ComponentFixture<TestRoutingComponent>;

  beforeEach(() => {
    resolveMock = mock(TestRoutingResolve);
    canActivateMock = mock(TestRoutingCanActivate);

    routes = [
      {
        path: '1',
        component: TestComponent,
        data: {
          skeleton: TestSkeleton1Component,
        },
        canActivate: [TestRoutingCanActivate],
      },
      {
        path: '2',
        component: TestComponent,
        data: {
          skeleton: TestSkeleton2Component,
        },
        resolve: {
          test: TestRoutingResolve,
        },
      },
      {
        path: '3',
        canActivate: [TestRoutingCanActivate],
        loadChildren: () => TestSkeletonLazyModule,
      },
      {
        path: '4',
        component: TestComponent,
        canActivate: [TestRoutingCanActivate],
      },
    ];
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule.withRoutes(routes)],
      declarations: [
        TestRoutingComponent,
        TestComponent,
        TestSkeleton1Component,
        TestSkeleton2Component,
        SkeletonComponent,
      ],
      providers: [
        {
          provide: TestRoutingResolve,
          useFactory: () => instance(resolveMock),
        },
        {
          provide: TestRoutingCanActivate,
          useFactory: () => instance(canActivateMock),
        },
        {
          provide: TEST_SKELETON_DEPENDENCY,
          useValue: 'dependency from parent module',
        },
      ],
    });
  });

  function setupComponent() {
    fixture = TestBed.createComponent(TestRoutingComponent);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);

    fixture.detectChanges();
  }

  describe('When route has a skeleton component', () => {
    it('In the process of route activating, skeleton component of route is shown', fakeAsync(() => {
      when(canActivateMock.canActivate(anything(), anything())).thenReturn(
        NEVER
      );

      setupComponent();
      ngZone.run(() => router.navigateByUrl('/1'));
      tick();
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toBe(
        'test-skeleton-1 with dependency from parent module'
      );
    }));

    it('After route is activated, projected content is shown', fakeAsync(() => {
      when(canActivateMock.canActivate(anything(), anything())).thenReturn(
        true
      );

      setupComponent();
      ngZone.run(() => router.navigateByUrl('/1'));
      tick();
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toBe(
        'inner-content'
      );
    }));

    it('In the process of route data resolving, skeleton component of route is shown', fakeAsync(() => {
      when(resolveMock.resolve(anything(), anything())).thenReturn(NEVER);

      setupComponent();
      ngZone.run(() => router.navigateByUrl('/2'));
      tick();
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toBe(
        'test-skeleton-2 with dependency from parent module'
      );
    }));

    it('After resolving route data, projected content is shown', fakeAsync(() => {
      when(resolveMock.resolve(anything(), anything())).thenReturn('data');

      setupComponent();
      ngZone.run(() => router.navigateByUrl('/2'));
      tick();
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toBe(
        'inner-content'
      );
    }));
  });

  it('When route does not have a skeleton component - projected content is shown', fakeAsync(() => {
    when(canActivateMock.canActivate(anything(), anything())).thenReturn(NEVER);

    setupComponent();
    ngZone.run(() => router.navigateByUrl('/4'));
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toBe(
      'inner-content'
    );
  }));
});

@Component({
  selector: 'test-routing',
  template: `<app-skeleton>inner-content</app-skeleton>`,
})
class TestRoutingComponent {}

@Injectable()
export class TestRoutingResolve implements Resolve<any> {
  resolve(): Observable<any> {
    return timer(0);
  }
}

@Injectable()
export class TestRoutingCanActivate implements CanActivate {
  canActivate(): Observable<boolean> {
    return timer(0).pipe(mapTo(true));
  }
}

@Component({
  selector: 'test',
  template: '',
})
class TestComponent {}

const TEST_SKELETON_DEPENDENCY = new InjectionToken<string>(
  '[TEST] Skeleton dependency'
);

@Component({
  selector: 'test-skeleton-1',
  template: 'test-skeleton-1 with {{ dependency }}',
})
class TestSkeleton1Component {
  constructor(
    @Inject(TEST_SKELETON_DEPENDENCY) public readonly dependency: string
  ) {}
}

@Component({
  selector: 'test-skeleton-2',
  template: 'test-skeleton-2 with {{ dependency }}',
})
class TestSkeleton2Component {
  constructor(
    @Inject(TEST_SKELETON_DEPENDENCY) public readonly dependency: string
  ) {}
}

@Component({
  selector: 'fin-test-lazy',
  template: '',
})
class TestLazyComponent {}

@Component({
  selector: 'test-skeleton-lazy',
  template: 'test-skeleton-lazy with {{ dependency }}',
})
class TestSkeletonLazyComponent {
  constructor(
    @Inject(TEST_SKELETON_DEPENDENCY) public readonly dependency: string
  ) {}
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '2',
        component: TestLazyComponent,
        data: {
          skeleton: TestSkeletonLazyComponent,
        },
        resolve: {
          test: TestRoutingResolve,
        },
      },
    ]),
  ],
  declarations: [TestLazyComponent, TestSkeletonLazyComponent],
  providers: [
    {
      provide: TEST_SKELETON_DEPENDENCY,
      useValue: 'dependency from lazy module',
    },
  ],
})
export class TestSkeletonLazyModule {}
