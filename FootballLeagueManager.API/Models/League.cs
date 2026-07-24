namespace FootballLeagueManager.API.Models
{
    public class League
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public int MaxTeams { get; set; }

        public ICollection<Team> Teams { get; set; } = new List<Team>();
    }
}