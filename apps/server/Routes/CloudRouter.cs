using InvoicesApp.ControllersNS.CloudNS;

namespace InvoicesApp.RoutesNS;

public static class CloudRouter
{
  public static void MapAPi(RouteGroupBuilder api)
  {
    api.MapPost("/cloud", CloudCtrl.PostFile);
    api.MapDelete("/cloud", CloudCtrl.DeleteFile);
  }
}