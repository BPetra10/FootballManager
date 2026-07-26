using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs
{
    public class GoalkeeperStatsDto
    {
        [Range(0, 100)]
        public int Diving { get; set; }

        [Range(0, 100)]
        public int Handling { get; set; }

        [Range(0, 100)]
        public int Kicking { get; set; }

        [Range(0, 100)]
        public int Reflexes { get; set; }

        [Range(0, 100)]
        public int Speed { get; set; }

        [Range(0, 100)]
        public int Positioning { get; set; }
    }
}