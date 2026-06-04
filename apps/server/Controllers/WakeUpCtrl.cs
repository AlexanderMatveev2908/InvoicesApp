using InvoicesApp.LibNS;

namespace InvoicesApp.ControllersNS.WakeUpNS;

public static class WakeUpCtrl
{
  public static IResult WakeUp()
  {
    return Res.Json(200, "⏰ Ops I did not hear the alarm ⏰");
  }
}