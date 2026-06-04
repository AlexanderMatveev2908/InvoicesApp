import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'notice',
    renderMode: RenderMode.Client,
  },
  {
    path: 'invoices/:invoiceID',
    renderMode: RenderMode.Server,
  },
  {
    path: 'invoices-post',
    renderMode: RenderMode.Client,
  },
  {
    path: 'invoices-put/:invoiceID',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
