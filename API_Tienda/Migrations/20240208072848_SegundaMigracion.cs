using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Tienda.Migrations
{
    /// <inheritdoc />
    public partial class SegundaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Modelo3dUrl",
                table: "Productos",
                newName: "Modelo3d");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Modelo3d",
                table: "Productos",
                newName: "Modelo3dUrl");
        }
    }
}
