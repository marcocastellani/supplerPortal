using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Remira.UCP.SupplierPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPriorityToQuestionnaire : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Questionnaires",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Questionnaires");
        }
    }
}
