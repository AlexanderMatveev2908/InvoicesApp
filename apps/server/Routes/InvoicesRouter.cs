using InvoicesApp.ControllersNS.InvoicesNS;

namespace InvoicesApp.RoutesNS.InvoicesNS;

public static class InvoicesRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost("/invoices", InvoicesCtrl.PostInvoice);
  }
}