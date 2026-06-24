namespace FootballLeagueManager.API.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public Guid LeagueId { get; set; }
        public League League { get; set; } = null!;
        public Guid ManagerId { get; set; }
        public User Manager { get; set; } = null!;
        public ICollection<Player> Players { get; set; } = new List<Player>();

    }
}
