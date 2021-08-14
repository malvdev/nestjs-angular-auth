import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import {
  GuardsCheckStart,
  NavigationCancel,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  RoutesRecognized,
} from '@angular/router';
import { concat, Observable, of } from 'rxjs';
import { filter, map, mapTo, switchMap, takeUntil } from 'rxjs/operators';

export interface SkeletonRouteData {
  component: Type<unknown>;
}

export interface Skeleton {
  component: Type<unknown>;
}

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  skeleton: Observable<SkeletonRouteData | null>;

  constructor(private readonly _router: Router) {
    const start = this._router.events.pipe(
      filter((event) => event instanceof GuardsCheckStart)
    );

    const end = this._router.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationEnd || event instanceof NavigationCancel
      )
    );

    const skeleton = this._router.events.pipe(
      filter(
        (event): event is RoutesRecognized => event instanceof RoutesRecognized
      ),
      map((event) => this._getSkeleton(event.state))
    );

    this.skeleton = skeleton.pipe(
      switchMap((skeleton) =>
        skeleton
          ? concat(start.pipe(mapTo(skeleton), takeUntil(end)), of(null))
          : of(null)
      )
    );
  }

  private _getSkeleton(state: RouterStateSnapshot): Skeleton | null {
    let route = state.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const component = route?.routeConfig?.data?.skeleton;

    return component ? { component } : null;
  }
}
