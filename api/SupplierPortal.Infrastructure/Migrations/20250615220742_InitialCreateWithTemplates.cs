using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Remira.UCP.SupplierPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateWithTemplates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuestionnaireTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    TargetEntityTypeId = table.Column<int>(type: "int", nullable: false),
                    PrimaryLanguage = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ExpirationMonths = table.Column<int>(type: "int", nullable: false),
                    CertificateType = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionnaireTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SupplyNetworkEntities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExternalCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EntityType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LegalName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    VatCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TaxCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    Region = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ZipCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ContactPersonName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    RoleInSupplyChain = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tags = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    AccreditationStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    AccreditationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeactivationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupplyNetworkEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupplyNetworkEntities_SupplyNetworkEntities_ParentId",
                        column: x => x.ParentId,
                        principalTable: "SupplyNetworkEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Test",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Test", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExternalId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuestionnaireSections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Order = table.Column<int>(type: "int", nullable: false),
                    QuestionnaireTemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TranslationsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionnaireSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionnaireSections_QuestionnaireTemplates_QuestionnaireTemplateId",
                        column: x => x.QuestionnaireTemplateId,
                        principalTable: "QuestionnaireTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AgentAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AgentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgentAssignments_Users_AgentId",
                        column: x => x.AgentId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AgentAssignments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Questionnaires",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupplierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AssignedUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AssignedAgentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questionnaires", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questionnaires_QuestionnaireTemplates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "QuestionnaireTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Questionnaires_SupplyNetworkEntities_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "SupplyNetworkEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Questionnaires_Users_AssignedAgentId",
                        column: x => x.AssignedAgentId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Questionnaires_Users_AssignedUserId",
                        column: x => x.AssignedUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserSuppliers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SupplierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSuppliers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSuppliers_SupplyNetworkEntities_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "SupplyNetworkEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSuppliers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TemplateQuestions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    HelpText = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    AllowDocumentUpload = table.Column<bool>(type: "bit", nullable: false),
                    MaxDocuments = table.Column<int>(type: "int", nullable: false),
                    RequireDocuments = table.Column<bool>(type: "bit", nullable: false),
                    ConfigurationJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuestionnaireTemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TranslationsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemplateQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TemplateQuestions_QuestionnaireSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "QuestionnaireSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TemplateQuestions_QuestionnaireTemplates_QuestionnaireTemplateId",
                        column: x => x.QuestionnaireTemplateId,
                        principalTable: "QuestionnaireTemplates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Remediations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuestionnaireId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ResponsibleUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ResponsibleAgentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Remediations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Remediations_Questionnaires_QuestionnaireId",
                        column: x => x.QuestionnaireId,
                        principalTable: "Questionnaires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Remediations_Users_ResponsibleAgentId",
                        column: x => x.ResponsibleAgentId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Remediations_Users_ResponsibleUserId",
                        column: x => x.ResponsibleUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "QuestionConditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TriggerQuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TargetQuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConditionType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TriggerValue = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Action = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    QuestionnaireTemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionConditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionConditions_QuestionnaireTemplates_QuestionnaireTemplateId",
                        column: x => x.QuestionnaireTemplateId,
                        principalTable: "QuestionnaireTemplates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuestionConditions_TemplateQuestions_TargetQuestionId",
                        column: x => x.TargetQuestionId,
                        principalTable: "TemplateQuestions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuestionConditions_TemplateQuestions_TriggerQuestionId",
                        column: x => x.TriggerQuestionId,
                        principalTable: "TemplateQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgentAssignments_AgentId_UserId",
                table: "AgentAssignments",
                columns: new[] { "AgentId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AgentAssignments_UserId",
                table: "AgentAssignments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionConditions_ConditionType",
                table: "QuestionConditions",
                column: "ConditionType");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionConditions_QuestionnaireTemplateId",
                table: "QuestionConditions",
                column: "QuestionnaireTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionConditions_TargetQuestionId",
                table: "QuestionConditions",
                column: "TargetQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionConditions_TriggerQuestionId",
                table: "QuestionConditions",
                column: "TriggerQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_AssignedAgentId",
                table: "Questionnaires",
                column: "AssignedAgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_AssignedUserId",
                table: "Questionnaires",
                column: "AssignedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_DueDate",
                table: "Questionnaires",
                column: "DueDate");

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_Status",
                table: "Questionnaires",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_SupplierId",
                table: "Questionnaires",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_TemplateId",
                table: "Questionnaires",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireSections_QuestionnaireTemplateId_Order",
                table: "QuestionnaireSections",
                columns: new[] { "QuestionnaireTemplateId", "Order" });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireTemplates_Created",
                table: "QuestionnaireTemplates",
                column: "Created");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireTemplates_Status",
                table: "QuestionnaireTemplates",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireTemplates_Title_Status",
                table: "QuestionnaireTemplates",
                columns: new[] { "Title", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Remediations_DueDate",
                table: "Remediations",
                column: "DueDate");

            migrationBuilder.CreateIndex(
                name: "IX_Remediations_QuestionnaireId",
                table: "Remediations",
                column: "QuestionnaireId");

            migrationBuilder.CreateIndex(
                name: "IX_Remediations_ResponsibleAgentId",
                table: "Remediations",
                column: "ResponsibleAgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Remediations_ResponsibleUserId",
                table: "Remediations",
                column: "ResponsibleUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Remediations_Status",
                table: "Remediations",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Name",
                table: "SupplyNetworkEntities",
                column: "LegalName");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyNetworkEntities_AccreditationStatus",
                table: "SupplyNetworkEntities",
                column: "AccreditationStatus");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyNetworkEntities_EntityType",
                table: "SupplyNetworkEntities",
                column: "EntityType");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyNetworkEntities_ExternalCode",
                table: "SupplyNetworkEntities",
                column: "ExternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyNetworkEntities_ParentId",
                table: "SupplyNetworkEntities",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyNetworkEntities_VatCode",
                table: "SupplyNetworkEntities",
                column: "VatCode");

            migrationBuilder.CreateIndex(
                name: "IX_TemplateQuestions_QuestionnaireTemplateId_Order",
                table: "TemplateQuestions",
                columns: new[] { "QuestionnaireTemplateId", "Order" });

            migrationBuilder.CreateIndex(
                name: "IX_TemplateQuestions_SectionId_Order",
                table: "TemplateQuestions",
                columns: new[] { "SectionId", "Order" });

            migrationBuilder.CreateIndex(
                name: "IX_TemplateQuestions_Type",
                table: "TemplateQuestions",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ExternalId",
                table: "Users",
                column: "ExternalId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSuppliers_SupplierId",
                table: "UserSuppliers",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSuppliers_UserId_SupplierId",
                table: "UserSuppliers",
                columns: new[] { "UserId", "SupplierId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentAssignments");

            migrationBuilder.DropTable(
                name: "QuestionConditions");

            migrationBuilder.DropTable(
                name: "Remediations");

            migrationBuilder.DropTable(
                name: "Test");

            migrationBuilder.DropTable(
                name: "UserSuppliers");

            migrationBuilder.DropTable(
                name: "TemplateQuestions");

            migrationBuilder.DropTable(
                name: "Questionnaires");

            migrationBuilder.DropTable(
                name: "QuestionnaireSections");

            migrationBuilder.DropTable(
                name: "SupplyNetworkEntities");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "QuestionnaireTemplates");
        }
    }
}
