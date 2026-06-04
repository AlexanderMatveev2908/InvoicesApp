namespace InvoicesApp.TypesNS;

using System.ComponentModel.DataAnnotations;

public sealed class InvoiceDto
{
  [Required]
  [MinLength(3)]
  public string BillFromStreet { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillFromCity { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillFromZip { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillFromCountry { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillToClientName { get; set; } = null!;

  [Required]
  [EmailAddress]
  public string BillToClientMail { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillToStreet { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillToCity { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillToZip { get; set; } = null!;

  [Required]
  [MinLength(3)]
  public string BillToCountry { get; set; } = null!;

  [Required]
  public DateTime InvoiceDate { get; set; }

  [Required]
  [MinLength(3)]
  public string PaymentTerm { get; set; } = null!;

  [Required]
  [MinLength(1)]
  public List<ItemDto> ItemsList { get; set; } = [];
}

public sealed class ItemDto
{
  [Required]
  [StringLength(100, MinimumLength = 1)]
  public string Name { get; set; } = null!;

  [Range(1, int.MaxValue)]
  public int Qty { get; set; }

  [Range(typeof(decimal), "0.01", "999999")]
  public decimal Price { get; set; }
}