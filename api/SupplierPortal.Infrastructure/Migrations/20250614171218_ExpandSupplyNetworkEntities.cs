using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Remira.UCP.SupplierPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ExpandSupplyNetworkEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Suppliers_Code",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Suppliers");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Suppliers",
                newName: "Active");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Suppliers",
                newName: "RoleInSupplyChain");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<DateTime>(
                name: "AccreditationDate",
                table: "Suppliers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccreditationStatus",
                table: "Suppliers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Suppliers",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPersonName",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Suppliers",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeactivationDate",
                table: "Suppliers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EntityType",
                table: "Suppliers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExternalCode",
                table: "Suppliers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LegalName",
                table: "Suppliers",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ParentId",
                table: "Suppliers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Suppliers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShortName",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Suppliers",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaxCode",
                table: "Suppliers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VatCode",
                table: "Suppliers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Suppliers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_AccreditationStatus",
                table: "Suppliers",
                column: "AccreditationStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_EntityType",
                table: "Suppliers",
                column: "EntityType");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_ExternalCode",
                table: "Suppliers",
                column: "ExternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Name",
                table: "Suppliers",
                column: "LegalName");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_ParentId",
                table: "Suppliers",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_VatCode",
                table: "Suppliers",
                column: "VatCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Suppliers_Suppliers_ParentId",
                table: "Suppliers",
                column: "ParentId",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Suppliers_Suppliers_ParentId",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_AccreditationStatus",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_EntityType",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_ExternalCode",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_Name",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_ParentId",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_VatCode",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "AccreditationDate",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "AccreditationStatus",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ContactPersonName",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "DeactivationDate",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "EntityType",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ExternalCode",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "LegalName",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ShortName",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "TaxCode",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "VatCode",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Suppliers");

            migrationBuilder.RenameColumn(
                name: "RoleInSupplyChain",
                table: "Suppliers",
                newName: "Code");

            migrationBuilder.RenameColumn(
                name: "Active",
                table: "Suppliers",
                newName: "IsActive");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Suppliers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Code",
                table: "Suppliers",
                column: "Code",
                unique: true);
        }
    }
}
