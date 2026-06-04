using InvoicesApp.LibNS;

namespace InvoicesApp.ValidatorsNS.RootNS;

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;

public static class RootCheck
{
  public static async Task<IResult?> Main<T>(HttpContext ctx)
  {
    if (!ctx.Request.HasJsonContentType())
      return Res.Json(415, "Content-Type must be application/json");

    T? dto;

    try
    {
      dto = await ctx.Request.ReadFromJsonAsync<T>();
    }
    catch
    {
      return Res.Json(400, "Invalid JSON body");
    }

    if (dto is null)
      return Res.Json(400, "Request body is required");

    List<ValidationResult> errors = [];
    ValidationContext validationCtx = new(dto);

    bool isValid = Validator.TryValidateObject(
      dto,
      validationCtx,
      errors,
      validateAllProperties: true
    );

    if (!isValid)
    {
      var formattedErrors = errors.Select(err => new
      {
        Field = err.MemberNames.FirstOrDefault(),
        Message = err.ErrorMessage
      });

      return Res.Json(400, "Validation failed", new
      {
        errors = formattedErrors
      });
    }

    ctx.Items["dto"] = dto;

    return null;
  }
}