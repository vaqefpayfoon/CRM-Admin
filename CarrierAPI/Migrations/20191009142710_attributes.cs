using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarrierAPI.Migrations
{
    public partial class attributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ModelsAttributes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    RelatedObjectId = table.Column<Guid>(nullable: false),
                    AttributeName = table.Column<string>(nullable: true),
                    AttributeValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModelsAttributes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModelsAttributes");
        }
    }
}
