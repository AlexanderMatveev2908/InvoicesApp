using InvoicesApp.LibNS;

namespace InvoicesApp.ControllersNS.InvoicesNS;

public static class InvoicesCtrl
{

  public static IResult PostInvoice(HttpContext ctx)
  {
    Console.WriteLine("run");

    return Res.Json(200, "test");
  }
}