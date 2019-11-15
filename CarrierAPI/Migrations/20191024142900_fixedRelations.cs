using Microsoft.EntityFrameworkCore.Migrations;

namespace CarrierAPI.Migrations
{
    public partial class fixedRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UsersProjects_AdminUserId",
                table: "UsersProjects",
                column: "AdminUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects");

            migrationBuilder.DropIndex(
                name: "IX_UsersProjects_AdminUserId",
                table: "UsersProjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects",
                columns: new[] { "AdminUserId", "UserId" });
        }
    }
}
