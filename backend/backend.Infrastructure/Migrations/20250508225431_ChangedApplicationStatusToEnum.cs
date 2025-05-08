using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedApplicationStatusToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ApplicationStatus",
                table: "JobApplication",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ApplicationStatus",
                table: "JobApplication",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
