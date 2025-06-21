using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Remira.UCP.SupplierPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionnaireTemplateEntityTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuestionnaireTemplateEntityTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionnaireTemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EntityType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionnaireTemplateEntityTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionnaireTemplateEntityTypes_QuestionnaireTemplates_QuestionnaireTemplateId",
                        column: x => x.QuestionnaireTemplateId,
                        principalTable: "QuestionnaireTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireTemplateEntityType_Template_EntityType",
                table: "QuestionnaireTemplateEntityTypes",
                columns: new[] { "QuestionnaireTemplateId", "EntityType" },
                unique: true);

            // Migrate existing data from TargetEntityTypeId to new junction table
            migrationBuilder.Sql(@"
                INSERT INTO QuestionnaireTemplateEntityTypes (Id, QuestionnaireTemplateId, EntityType)
                SELECT 
                    NEWID(),
                    Id,
                    TargetEntityTypeId
                FROM QuestionnaireTemplates
                WHERE TargetEntityTypeId IS NOT NULL
            ");

            // Add comment to indicate field is obsolete
            migrationBuilder.Sql(@"
                EXEC sp_addextendedproperty 
                @name = N'MS_Description',
                @value = N'OBSOLETE: Use TargetEntityTypes navigation property instead. Field maintained for backward compatibility.',
                @level0type = N'SCHEMA', @level0name = N'dbo',
                @level1type = N'TABLE', @level1name = N'QuestionnaireTemplates',
                @level2type = N'COLUMN', @level2name = N'TargetEntityTypeId'
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Rollback: Update TargetEntityTypeId based on junction table data
            // Only for templates that have exactly one entity type mapping
            migrationBuilder.Sql(@"
                UPDATE QuestionnaireTemplates 
                SET TargetEntityTypeId = (
                    SELECT TOP 1 EntityType 
                    FROM QuestionnaireTemplateEntityTypes 
                    WHERE QuestionnaireTemplateId = QuestionnaireTemplates.Id
                )
                WHERE Id IN (
                    SELECT QuestionnaireTemplateId 
                    FROM QuestionnaireTemplateEntityTypes
                    GROUP BY QuestionnaireTemplateId
                    HAVING COUNT(*) = 1
                )
            ");

            // Drop the junction table
            migrationBuilder.DropTable(
                name: "QuestionnaireTemplateEntityTypes");
        }
    }
}
