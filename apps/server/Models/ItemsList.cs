public class ItemsList
{
  public int Id { get; set; }

  public string Name { get; set; } = null!;
  public int Qty { get; set; }
  public decimal Price { get; set; }

  public int InvoiceId { get; set; }
  public Invoices Invoice { get; set; } = null!;
}