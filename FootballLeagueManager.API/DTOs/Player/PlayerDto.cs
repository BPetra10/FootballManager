using System.ComponentModel.DataAnnotations;
using FootballLeagueManager.API.Models;

namespace FootballLeagueManager.API.DTOs.Player
{
    public class PlayerDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Range(15, 50)]
        public int Age { get; set; }

        public Position Position { get; set; }

        public PreferredFoot PreferredFoot { get; set; }

        public Guid TeamId { get; set; }

        public FieldPlayerStatsDto? FieldStats { get; set; }

        public GoalkeeperStatsDto? GoalkeeperStats { get; set; }
    }
}