import {
  afterNextRender,
  effect,
  EffectCleanupRegisterFn,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { UsePlatformSvc } from '../services/use_platform';

@Injectable()
export class UseInjCtxHk {
  public readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly inj: EnvironmentInjector = inject(EnvironmentInjector);

  public useEffect(cb: (onCleanup: EffectCleanupRegisterFn) => void): void {
    this.usePlatform.inGlobalCtx(() => {
      effect(cb, { injector: this.inj });
    });
  }

  public useDOM(cb: () => void): void {
    this.usePlatform.onClient(() => {
      this.usePlatform.inGlobalCtx(() => {
        afterNextRender(() => {
          requestAnimationFrame(() => cb());
        });
      });
    });
  }
}
