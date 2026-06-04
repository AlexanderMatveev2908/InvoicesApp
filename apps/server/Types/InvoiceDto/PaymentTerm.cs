using System.ComponentModel.DataAnnotations;

namespace InvoicesApp.TypesNS;


public sealed class PaymentTermAttribute : ValidationAttribute
{
  private static readonly HashSet<string> AllowedTerms = [
      "Net 1 Day",
    "Net 7 Days",
    "Net 14 Days",
    "Net 30 Days"
  ];

  public override bool IsValid(object? val)
  {
    return val is string && AllowedTerms.Contains(val);
  }

  public override string FormatErrorMessage(string name)
  {
    return $"{name} must be one of: {string.Join(", ", AllowedTerms)}";
  }
}