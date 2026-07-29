using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs.Player
{
    public class FieldPlayerStatsDto
    {
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
    }
}