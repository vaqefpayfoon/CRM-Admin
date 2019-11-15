using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarrierAPI.Migrations
{
    public partial class chargeCorrection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "SupcustGoodId",
                table: "UsersProjects",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "UsersProjects",
                nullable: true,
                oldClrType: typeof(Guid));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "SupcustGoodId",
                table: "UsersProjects",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "UsersProjects",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);
        }
    }
}
