namespace FootballLeagueManager.API.DTOs.Player
{
    public class PlayerResponse
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int Age { get; set; }

        public string Position { get; set; } = string.Empty;

        public string PreferredFoot { get; set; } = string.Empty;

        public Guid TeamId { get; set; }

        public string TeamName { get; set; } = string.Empty;

        public int Overall { get; set; }

        public FieldPlayerStatsDto? FieldStats { get; set; }

        public GoalkeeperStatsDto? GoalkeeperStats { get; set; }
    }
}