using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs
{
    public class LeagueDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 100)]
        public int MaxTeams { get; set; }
    }
}