using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs.Team
{
    public class TeamDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;
        public Guid LeagueId { get; set; }
        public Guid? ManagerId { get; set; }
    }
}
