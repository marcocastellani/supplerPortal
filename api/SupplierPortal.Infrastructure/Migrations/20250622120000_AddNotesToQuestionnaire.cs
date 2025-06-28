using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Remira.UCP.SupplierPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNotesToQuestionnaire : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Questionnaires",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Questionnaires");
        }
    }
}