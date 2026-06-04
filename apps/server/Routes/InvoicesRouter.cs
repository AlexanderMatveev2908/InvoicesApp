using InvoicesApp.ControllersNS.InvoicesNS;
using InvoicesApp.FilterNS.RootNS;
using InvoicesApp.TypesNS;

namespace InvoicesApp.RoutesNS.InvoicesNS;

public static class InvoicesRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost("/invoices", InvoicesCtrl.PostInvoice).AddEndpointFilter<RootFilter<InvoiceDto>>();

    api.MapGet("/invoices", InvoicesCtrl.GetInvoices);
  }
}