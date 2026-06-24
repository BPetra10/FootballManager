using System.ComponentModel.DataAnnotations;
using FootballLeagueManager.API.Models;

namespace FootballLeagueManager.API.DTOs
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

        [Range(0, 100)]
        public int Pace { get; set; }

        [Range(0, 100)]
        public int Shooting { get; set; }

        [Range(0, 100)]
        public int Passing { get; set; }

        [Range(0, 100)]
        public int Dribbling { get; set; }

        [Range(0, 100)]
        public int Defending { get; set; }

        [Range(0, 100)]
        public int Physical { get; set; }
        public Guid TeamId { get; set; }
    }
}