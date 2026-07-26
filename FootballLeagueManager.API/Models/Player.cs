namespace FootballLeagueManager.API.Models
{
    public class Player
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int Age { get; set; }

        public Position Position { get; set; }

        public PreferredFoot PreferredFoot { get; set; }

        public Guid TeamId { get; set; }

        public Team Team { get; set; } = null!;

        public FieldPlayerStats? FieldPlayerStats { get; set; }

        public GoalkeeperStats? GoalkeeperStats { get; set; }
    }
}