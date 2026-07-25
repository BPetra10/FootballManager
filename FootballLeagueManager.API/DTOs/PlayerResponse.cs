namespace FootballLeagueManager.API.DTOs
{
    public class PlayerResponse
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int Age { get; set; }

        public string Position { get; set; } = string.Empty;

        public string PreferredFoot { get; set; } = string.Empty;

        public int Pace { get; set; }

        public int Shooting { get; set; }

        public int Passing { get; set; }

        public int Dribbling { get; set; }

        public int Defending { get; set; }

        public int Physical { get; set; }

        public Guid TeamId { get; set; }

        public string TeamName { get; set; } = string.Empty;

        public int Overall { get; set; }
    }
}