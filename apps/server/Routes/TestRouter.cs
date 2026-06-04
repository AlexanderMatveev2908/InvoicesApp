using InvoicesApp.ExtensionsNS.RateLimitNS;
using InvoicesApp.LibNS;

namespace InvoicesApp.RoutesNS;

public static class TestRouter
{

  public static void MapAPi(RouteGroupBuilder api)
  {
    api.MapGet("test", () =>
    {
      return Res.Json(200, "Hello world");
    }).WithRateLimit(
        TimeSpan.FromMinutes(5),
        5
    );
  }
}