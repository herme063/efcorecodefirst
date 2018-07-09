using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hzero.efcorecodefirst.DataModel.Migrations
{
    public partial class AddThumbAndSnaphost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Snapshots",
                columns: table => new
                {
                    CourtUid = table.Column<Guid>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    Content = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Snapshots", x => new { x.CourtUid, x.Index });
                    table.ForeignKey(
                        name: "FK_Snapshots_BasketballCourts_CourtUid",
                        column: x => x.CourtUid,
                        principalTable: "BasketballCourts",
                        principalColumn: "Uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Thumbs",
                columns: table => new
                {
                    CourtUid = table.Column<Guid>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    Content = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thumbs", x => new { x.CourtUid, x.Index });
                    table.ForeignKey(
                        name: "FK_Thumbs_BasketballCourts_CourtUid",
                        column: x => x.CourtUid,
                        principalTable: "BasketballCourts",
                        principalColumn: "Uid",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Snapshots");

            migrationBuilder.DropTable(
                name: "Thumbs");
        }
    }
}
