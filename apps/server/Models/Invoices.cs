public class Invoices
{
  public int Id { get; set; }

  public string BillFromStreet { get; set; } = null!;
  public string BillFromCity { get; set; } = null!;
  public string BillFromZip { get; set; } = null!;
  public string BillFromCountry { get; set; } = null!;
  public string BillToClientName { get; set; } = null!;
  public string BillToClientMail { get; set; } = null!;
  public string BillToStreet { get; set; } = null!;
  public string BillToCity { get; set; } = null!;
  public string BillToZip { get; set; } = null!;
  public string BillToCountry { get; set; } = null!;
  public DateTime InvoiceDate { get; set; }
  public string PaymentTerm { get; set; } = null!;
  public string Description { get; set; } = null!;
  public string Status { get; set; } = null!;

  public List<ItemsList> Items { get; set; } = [];
}