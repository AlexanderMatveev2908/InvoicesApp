using InvoicesApp.ConfigNS.SqlNS;
using InvoicesApp.LibNs;
using InvoicesApp.LibNS;
using InvoicesApp.TypesNS;

namespace InvoicesApp.ControllersNS.InvoicesNS;

public static class InvoicesCtrl
{

  public static async Task<IResult> PostInvoice(HttpContext ctx, SqlDbCtx db)
  {

    InvoiceDto dto = (InvoiceDto)ctx.Items["dto"]!;

    await using var trx = await db.Database.BeginTransactionAsync();

    Console.WriteLine(ctx.Items["dto"]);

    try
    {
      Invoices newInvoice = new()
      {
        ClientId = GeneratorIds.Main(),

        BillFromStreet = dto.BillFromStreet,
        BillFromCity = dto.BillFromCity,
        BillFromZip = dto.BillFromZip,
        BillFromCountry = dto.BillFromCountry,

        BillToClientName = dto.BillToClientName,
        BillToClientMail = dto.BillToClientMail,
        BillToStreet = dto.BillToStreet,
        BillToCity = dto.BillToCity,
        BillToZip = dto.BillToZip,
        BillToCountry = dto.BillToCountry,

        Description = dto.Description,
        InvoiceDate = DateTime.SpecifyKind(
        dto.InvoiceDate!.Value,
        DateTimeKind.Utc),
        PaymentTerm = dto.PaymentTerm,
        Status = dto.Status,

        Items = dto.ItemsList.Select(item => new ItemsList
        {
          Name = item.Name,
          Qty = item.Qty,
          Price = item.Price
        }).ToList()
      };

      db.Invoices.Add(newInvoice);

      await db.SaveChangesAsync
      ();
      await trx.CommitAsync();

      return Res.Json(201, "Invoice created", new
      {
        Invoice = LibShape.Merge<InvoiceDto>(dto, new
        {
          Id = newInvoice.Id
        })
      });
    }
    catch
    {
      await trx.RollbackAsync();

      return Res.Json(500, "Internal Server Error");
    }

  }
}