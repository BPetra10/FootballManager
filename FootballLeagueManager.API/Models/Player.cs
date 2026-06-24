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
        public int Pace { get; set; }
        public int Shooting { get; set; }
        public int Passing { get; set; }
        public int Dribbling { get; set; }
        public int Defending { get; set; }
        public int Physical { get; set; }
        public Guid TeamId { get; set; }
        public Team Team { get; set; } = null!;
    }
}
