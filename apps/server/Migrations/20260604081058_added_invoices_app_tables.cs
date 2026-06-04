using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace InvoicesApp.Migrations
{
    /// <inheritdoc />
    public partial class added_invoices_app_tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillFromStreet = table.Column<string>(type: "text", nullable: false),
                    BillFromCity = table.Column<string>(type: "text", nullable: false),
                    BillFromZip = table.Column<string>(type: "text", nullable: false),
                    BillFromCountry = table.Column<string>(type: "text", nullable: false),
                    BillToClientName = table.Column<string>(type: "text", nullable: false),
                    BillToClientMail = table.Column<string>(type: "text", nullable: false),
                    BillToStreet = table.Column<string>(type: "text", nullable: false),
                    BillToCity = table.Column<string>(type: "text", nullable: false),
                    BillToZip = table.Column<string>(type: "text", nullable: false),
                    BillToCountry = table.Column<string>(type: "text", nullable: false),
                    InvoiceDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PaymentTerm = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemsList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Qty = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    InvoiceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemsList_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemsList_InvoiceId",
                table: "ItemsList",
                column: "InvoiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemsList");

            migrationBuilder.DropTable(
                name: "Invoices");
        }
    }
}
