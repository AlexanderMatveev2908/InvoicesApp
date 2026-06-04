using Microsoft.EntityFrameworkCore;
using InvoicesApp.ModelsNS;

namespace InvoicesApp.ConfigNS.SqlNS;

public class SqlDbCtx : DbContext
{
  public SqlDbCtx(DbContextOptions<SqlDbCtx> options) : base(options)
  {
  }

  public DbSet<Users> Users => Set<Users>();
  public DbSet<Invoices> Invoices => Set<Invoices>();
  public DbSet<ItemsList> ItemsList => Set<ItemsList>();
  protected override void OnModelCreating(
     ModelBuilder modelBuilder
 )
  {
    modelBuilder.Entity<Users>()
        .HasIndex(u => u.Email)
        .IsUnique();

    modelBuilder.Entity<Invoices>()
        .HasIndex(i => i.ClientId)
        .IsUnique();

    modelBuilder.Entity<ItemsList>()
    .HasOne(item => item.Invoice)
    .WithMany(invoice => invoice.Items)
    .HasForeignKey(item => item.InvoiceId)
    .OnDelete(DeleteBehavior.Cascade);
  }
}