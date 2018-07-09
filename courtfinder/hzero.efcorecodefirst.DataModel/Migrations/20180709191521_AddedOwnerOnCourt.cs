using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hzero.efcorecodefirst.DataModel.Migrations
{
    public partial class AddedOwnerOnCourt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AddedByUid",
                table: "BasketballCourts",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "AddedOn",
                table: "BasketballCourts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_BasketballCourts_AddedByUid",
                table: "BasketballCourts",
                column: "AddedByUid",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BasketballCourts_Players_AddedByUid",
                table: "BasketballCourts",
                column: "AddedByUid",
                principalTable: "Players",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketballCourts_Players_AddedByUid",
                table: "BasketballCourts");

            migrationBuilder.DropIndex(
                name: "IX_BasketballCourts_AddedByUid",
                table: "BasketballCourts");

            migrationBuilder.DropColumn(
                name: "AddedByUid",
                table: "BasketballCourts");

            migrationBuilder.DropColumn(
                name: "AddedOn",
                table: "BasketballCourts");
        }
    }
}
