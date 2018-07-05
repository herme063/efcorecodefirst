using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hzero.efcorecodefirst.DataModel.Migrations
{
    public partial class ModelsUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_BasketballCourts_BasketballCourtUid",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Players_PlayerId",
                table: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_BasketballCourtUid",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_PlayerId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Uid",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "BasketballCourtUid",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "Ratings",
                newName: "PlayerUid");

            migrationBuilder.AddColumn<Guid>(
                name: "CourtUid",
                table: "Ratings",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "Timestamp",
                table: "Ratings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings",
                columns: new[] { "CourtUid", "PlayerUid" });

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_PlayerUid",
                table: "Ratings",
                column: "PlayerUid");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_BasketballCourts_CourtUid",
                table: "Ratings",
                column: "CourtUid",
                principalTable: "BasketballCourts",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Players_PlayerUid",
                table: "Ratings",
                column: "PlayerUid",
                principalTable: "Players",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_BasketballCourts_CourtUid",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Players_PlayerUid",
                table: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_PlayerUid",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "CourtUid",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "PlayerUid",
                table: "Ratings",
                newName: "PlayerId");

            migrationBuilder.AddColumn<Guid>(
                name: "Uid",
                table: "Ratings",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "BasketballCourtUid",
                table: "Ratings",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings",
                column: "Uid");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_BasketballCourtUid",
                table: "Ratings",
                column: "BasketballCourtUid");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_PlayerId",
                table: "Ratings",
                column: "PlayerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_BasketballCourts_BasketballCourtUid",
                table: "Ratings",
                column: "BasketballCourtUid",
                principalTable: "BasketballCourts",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Players_PlayerId",
                table: "Ratings",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
