import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Constructor } from './constructor';

// WARNING: THIS DOES NOT WORK IN ANGULAR 8 WITH AOT!
// HOWEVER, IT DOES WORK IN ANGULAR 9!
export const subscribedContainerMixin = <T extends Constructor>(base: T = class {} as T) =>
  class extends base implements OnDestroy {
    destroyed$ = new Subject<void>();
    /**
     * DO NOT this.destroyed$.complete();
     * It is not necessary:
     * https://stackoverflow.com/questions/44289859/do-i-need-to-complete-a-subject-for-it-to-be-garbage-collected
     */
    ngOnDestroy(): void {
      this.destroyed$.next();
    }
  };
