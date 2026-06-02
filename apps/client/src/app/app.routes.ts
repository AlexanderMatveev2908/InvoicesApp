import { HomePage } from '@/pages/home_page/home-page';
import { InvoicePage } from '@/pages/invoice_page/invoice-page';
import { NotFoundPage } from '@/pages/not_found_page/not-found-page';
import { NoticePage } from '@/pages/notice_page/notice-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'notice',
    component: NoticePage,
  },
  {
    path: 'invoices/:invoiceID',
    component: InvoicePage,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
