using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballLeagueManager.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryToLeague : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Leagues",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Leagues");
        }
    }
}
