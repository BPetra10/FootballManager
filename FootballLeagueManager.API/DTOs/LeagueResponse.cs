namespace FootballLeagueManager.API.DTOs
{
    public class LeagueResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public int CurrentTeams { get; set; }

        public int MaxTeams { get; set; }
    }
}