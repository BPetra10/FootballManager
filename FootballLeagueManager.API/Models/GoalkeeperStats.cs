using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.Models
{
    public class GoalkeeperStats
    {
        public Guid PlayerId { get; set; }

        public Player Player { get; set; } = null!;

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