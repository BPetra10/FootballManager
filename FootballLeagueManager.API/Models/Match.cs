
// Represents a football match between two teams.
namespace FootballLeagueManager.API.Models
{
    public class Match
    {
        public Guid Id { get; set; }
        public Guid HomeTeamId { get; set; }
        public Team HomeTeam { get; set; } = null!;
        public Guid AwayTeamId { get; set; }
        public Team AwayTeam { get; set; } = null!;
        public DateTime MatchDate { get; set; }
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
        public bool IsPlayed { get; set; }
    }
}
