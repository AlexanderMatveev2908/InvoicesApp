using System.ComponentModel.DataAnnotations;

namespace InvoicesApp.TypesNS;


public sealed class StatusInvoiceAttribute : ValidationAttribute
{
  private static readonly HashSet<string> AllowedStatus = [
    "DRAFT",
    "PENDING",
    "PAID"
];

  public override bool IsValid(object? value)
  {
    return value is string && AllowedStatus.Contains(value);
  }

  public override string FormatErrorMessage(string name)
  {
    return $"{name} must be one of them: {string.Join(", ", AllowedStatus)}";
  }
}