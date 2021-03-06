import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ondestroy } from '../_app/decorators/ondestroy.decorator';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './decorator.component.html',
})
export class DecoratorComponent implements OnInit, OnDestroy {
  observable$: Observable<number> = interval(1000);
  subscription$$: Subscription;

  ngOnInit(): void {
    this.subscription$$ = this.observable$
      .pipe(tap(console.log), takeUntil((this as any).destroyed$))
      .subscribe();
  }

  @ondestroy()
  ngOnDestroy(): void {
    console.log('this.subscription$$.closed in ngOnDestroy:::', this.subscription$$.closed);
  }
}
