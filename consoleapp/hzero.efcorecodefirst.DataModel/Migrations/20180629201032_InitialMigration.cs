using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hzero.efcorecodefirst.DataModel.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BasketballCourts",
                columns: table => new
                {
                    Uid = table.Column<Guid>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Latitude = table.Column<decimal>(nullable: false),
                    Longitude = table.Column<decimal>(nullable: false),
                    Format = table.Column<int>(nullable: false),
                    Location = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasketballCourts", x => x.Uid);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Uid = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Uid);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Uid = table.Column<Guid>(nullable: false),
                    Score = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    PlayerId = table.Column<Guid>(nullable: false),
                    BasketballCourtUid = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Uid);
                    table.ForeignKey(
                        name: "FK_Ratings_BasketballCourts_BasketballCourtUid",
                        column: x => x.BasketballCourtUid,
                        principalTable: "BasketballCourts",
                        principalColumn: "Uid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ratings_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_BasketballCourtUid",
                table: "Ratings",
                column: "BasketballCourtUid");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_PlayerId",
                table: "Ratings",
                column: "PlayerId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "BasketballCourts");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
