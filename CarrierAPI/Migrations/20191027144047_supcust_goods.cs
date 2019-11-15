using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarrierAPI.Migrations
{
    public partial class supcust_goods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Supcusts_SupcustId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_SupcustId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Barcode",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "MoreInfo",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PersonName",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Serial",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SupcustId",
                table: "Products");

            migrationBuilder.CreateTable(
                name: "SupcustGoods",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    MoreInfo = table.Column<string>(nullable: true),
                    PersonName = table.Column<string>(nullable: true),
                    Serial = table.Column<string>(nullable: true),
                    Barcode = table.Column<string>(nullable: true),
                    SupcustId = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupcustGoods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupcustGoods_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupcustGoods_Supcusts_SupcustId",
                        column: x => x.SupcustId,
                        principalTable: "Supcusts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SupcustGoods_ProductId",
                table: "SupcustGoods",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SupcustGoods_SupcustId",
                table: "SupcustGoods",
                column: "SupcustId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SupcustGoods");

            migrationBuilder.AddColumn<string>(
                name: "Barcode",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MoreInfo",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonName",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Serial",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SupcustId",
                table: "Products",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Products_SupcustId",
                table: "Products",
                column: "SupcustId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Supcusts_SupcustId",
                table: "Products",
                column: "SupcustId",
                principalTable: "Supcusts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
