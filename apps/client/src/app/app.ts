import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { ThemeSlice } from '@/features/theme/slice';
import { UseStorageSvc } from '@/core/services/use_storage';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { ThemeT } from '@/features/theme/reducer';
import { SidebarDesktop } from '@/common/components/desktop/sidebar_desktop/sidebar-desktop';
import { NavbarMobileTablet } from '@/common/components/mixed/navbar_mobile_tablet/navbar-mobile-tablet';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseInvoicesApiSvc } from '@/features/invoices/api';
import { InvoiceT } from '@/common/types/invoices';
import { ResApiT } from '@/common/types/api';
import { UseSsrSvc } from '@/core/services/use_ssr';
import { InvoicesSlice } from '@/features/invoices/slice';
import { Nullable } from '@/common/types/general';
import { UseScrollSvc } from '@/core/services/use_scroll';
import { InvoicesFormTabletDesktop } from '@/features/invoices/forms/invoices_form_tablet_desktop/invoices-form-tablet-desktop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, WakeUp, NavbarMobileTablet, SidebarDesktop],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App extends UseInjCtxHk implements OnInit, AfterViewInit {
  private readonly themeSlice: ThemeSlice = inject(ThemeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly useInvoicesApi: UseInvoicesApiSvc = inject(UseInvoicesApiSvc);
  private readonly useSsr: UseSsrSvc = inject(UseSsrSvc);
  private readonly invoicesSlice: InvoicesSlice = inject(InvoicesSlice);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);

  private getInvoicesSsr(): void {
    this.usePlatform.onServer(() => {
      this.useInvoicesApi.getInvoicesSsr().subscribe((res: ResApiT<{ invoices: InvoiceT[] }>) => {
        this.useSsr.transferState.set(this.useSsr.invoicesKey, res.data.invoices);
        this.invoicesSlice.setInvoices(res.data.invoices);
      });
    });
  }

  private getInvoicesCsr(): void {
    this.useInvoicesApi.getInvoicesCsr().subscribe((res: ResApiT<{ invoices: InvoiceT[] }>) => {
      this.invoicesSlice.setInvoices(res.data.invoices);
    });
  }

  private setExistingOrFetch(): void {
    this.usePlatform.onClient(() => {
      const serverData: Nullable<InvoiceT[]> = this.useSsr.transferState.get(
        this.useSsr.invoicesKey,
        null,
      );

      if (serverData) {
        this.invoicesSlice.setInvoices(serverData);
        this.useSsr.transferState.remove(this.useSsr.invoicesKey);
      } else {
        this.getInvoicesCsr();
      }
    });
  }

  private refetchOnTrigger(): void {
    this.useEffect(() => {
      void this.invoicesSlice.refreshKey();
      this.getInvoicesCsr();
    });
  }

  ngOnInit(): void {
    this.useScroll.main();

    this.getInvoicesSsr();
    this.setExistingOrFetch();
    this.refetchOnTrigger();
  }

  ngAfterViewInit(): void {
    if (this.usePlatform.isServer) return;

    const theme = this.useStorage.getItem('theme');
    if (!theme) return;

    if (!['light', 'dark'].includes(theme as ThemeT)) return;
    this.themeSlice.setTheme(theme as ThemeT);
  }
}
