using Microsoft.EntityFrameworkCore;
using UserAccountsApi.ModelsNS;

namespace UserAccountsApi.ConfigNS.SqlNS;

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

  }
}