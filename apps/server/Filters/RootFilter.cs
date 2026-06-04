using InvoicesApp.ValidatorsNS.RootNS;

namespace InvoicesApp.FilterNS.RootNS;



public class RootFilter<T> : IEndpointFilter
{
  public async ValueTask<object?> InvokeAsync(
    EndpointFilterInvocationContext ctx,
    EndpointFilterDelegate next
  )
  {
    IResult? errorResult =
      await RootCheck.Main<T>(ctx.HttpContext);

    if (errorResult is not null)
      return errorResult;

    return await next(ctx);
  }
}