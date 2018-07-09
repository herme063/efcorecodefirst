using Microsoft.EntityFrameworkCore.Migrations;

namespace hzero.efcorecodefirst.DataModel.Migrations
{
    public partial class RemoveIndexOnCourtOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BasketballCourts_AddedByUid",
                table: "BasketballCourts");

            migrationBuilder.CreateIndex(
                name: "IX_BasketballCourts_AddedByUid",
                table: "BasketballCourts",
                column: "AddedByUid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BasketballCourts_AddedByUid",
                table: "BasketballCourts");

            migrationBuilder.CreateIndex(
                name: "IX_BasketballCourts_AddedByUid",
                table: "BasketballCourts",
                column: "AddedByUid",
                unique: true);
        }
    }
}
