import { HomePage } from '@/pages/home_page/home-page';
import { InvoicePage } from '@/pages/invoice_page/invoice-page';
import { InvoicesPostPage } from '@/pages/invoices_post_page/invoices-post-page';
import { InvoicesPutPage } from '@/pages/invoices_put_page/invoices-put-page';
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
    path: 'invoices-post',
    component: InvoicesPostPage,
  },
  {
    path: 'invoices-put/:invoiceID',
    component: InvoicesPutPage,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
