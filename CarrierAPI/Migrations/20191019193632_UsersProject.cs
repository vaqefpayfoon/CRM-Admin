using Microsoft.EntityFrameworkCore.Migrations;

namespace CarrierAPI.Migrations
{
    public partial class UsersProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects",
                columns: new[] { "AdminUserId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UsersProjects_Users_AdminUserId",
                table: "UsersProjects",
                column: "AdminUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersProjects_Users_AdminUserId",
                table: "UsersProjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProjects",
                table: "UsersProjects",
                column: "Id");
        }
    }
}
