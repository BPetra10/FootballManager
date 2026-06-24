using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballLeagueManager.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPlayer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    Position = table.Column<int>(type: "integer", nullable: false),
                    PreferredFoot = table.Column<int>(type: "integer", nullable: false),
                    Pace = table.Column<int>(type: "integer", nullable: false),
                    Shooting = table.Column<int>(type: "integer", nullable: false),
                    Passing = table.Column<int>(type: "integer", nullable: false),
                    Dribbling = table.Column<int>(type: "integer", nullable: false),
                    Defending = table.Column<int>(type: "integer", nullable: false),
                    Physical = table.Column<int>(type: "integer", nullable: false),
                    TeamId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_TeamId",
                table: "Players",
                column: "TeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
