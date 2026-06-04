using InvoicesApp.ConfigNS.SqlNS;
using InvoicesApp.LibNs;
using InvoicesApp.LibNS;
using InvoicesApp.TypesNS;
using Microsoft.EntityFrameworkCore;

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

  public static async Task<IResult> GetInvoices(SqlDbCtx db)
  {
    var invoices = await db.Invoices
      .Include(invoice => invoice.Items)
      .AsNoTracking()
      .Select(invoice => new
      {
        invoice.Id,
        invoice.ClientId,
        invoice.BillFromStreet,
        invoice.BillFromCity,
        invoice.BillFromZip,
        invoice.BillFromCountry,

        invoice.BillToClientName,
        invoice.BillToClientMail,
        invoice.BillToStreet,
        invoice.BillToCity,
        invoice.BillToZip,
        invoice.BillToCountry,

        invoice.InvoiceDate,
        invoice.PaymentTerm,
        invoice.Description,
        invoice.Status,

        ItemsList = invoice.Items.Select(item => new
        {
          item.Id,
          item.Name,
          item.Qty,
          item.Price
        })
      })
      .ToListAsync();

    return Res.Json(200, "Here u are", new
    {
      invoices
    });
  }

  public static async Task<IResult> DeleteInvoice(SqlDbCtx db, int invoiceId)
  {
    Invoices? invoice =
  await db.Invoices
    .FirstOrDefaultAsync(
      x => x.Id == invoiceId
    );


    if (invoice is null)
    {
      return Res.Json(
        404,
        "Invoice not found"
      );
    }

    db.Invoices.Remove(invoice);
    await db.SaveChangesAsync();

    return Res.Json(
      200,
      "Invoice deleted",
      new
      {
        deleted = invoiceId
      }
    );

  }


  public static async Task<IResult> PatchInvoice(SqlDbCtx db, int invoiceId)
  {
    Invoices? invoice =
       await db.Invoices
         .FirstOrDefaultAsync(
           x => x.Id == invoiceId
         );

    if (invoice is null)
    {
      return Res.Json(
        404,
        "Invoice not found"
      );
    }

    invoice.Status = "PAID";
    await db.SaveChangesAsync();


    return Res.Json(
     200,
     "Invoice updated",
     new
     {
       invoice.Id,
       invoice.Status
     }
   );
  }
}