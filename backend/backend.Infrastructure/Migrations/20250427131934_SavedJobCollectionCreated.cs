using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SavedJobCollectionCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SavedJobCollectionId",
                table: "SavedJob",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SavedJobCollection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedJobCollection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedJobCollection_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SavedJobCollection_User_UserId1",
                        column: x => x.UserId1,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedJob_SavedJobCollectionId",
                table: "SavedJob",
                column: "SavedJobCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedJobCollection_UserId",
                table: "SavedJobCollection",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedJobCollection_UserId1",
                table: "SavedJobCollection",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedJob_SavedJobCollection_SavedJobCollectionId",
                table: "SavedJob",
                column: "SavedJobCollectionId",
                principalTable: "SavedJobCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedJob_SavedJobCollection_SavedJobCollectionId",
                table: "SavedJob");

            migrationBuilder.DropTable(
                name: "SavedJobCollection");

            migrationBuilder.DropIndex(
                name: "IX_SavedJob_SavedJobCollectionId",
                table: "SavedJob");

            migrationBuilder.DropColumn(
                name: "SavedJobCollectionId",
                table: "SavedJob");
        }
    }
}
