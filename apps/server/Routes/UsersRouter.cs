using InvoicesApp.ConfigNS.SqlNS;
using InvoicesApp.ControllersNS.UsersNS;
using InvoicesApp.FiltersNS.UsersNS;

namespace InvoicesApp.RoutesNS.UserNS;

public static class UsersRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost(
     "/users", UsersCtrl.PostUser)
 .AddEndpointFilter<UsersFilter>();

    api.MapDelete("/users/{userId:int}", UsersCtrl.DeleteUser);
  }
}