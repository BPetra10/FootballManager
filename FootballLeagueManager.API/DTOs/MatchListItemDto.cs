namespace FootballLeagueManager.API.DTOs
{
    public class MatchListItemDto
    {
        public Guid Id { get; set; }
        public string HomeTeamName { get; set; } = string.Empty;
        public string AwayTeamName { get; set; } = string.Empty;
        public DateTime MatchDate { get; set; }
        public bool IsPlayed { get; set; }
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
    }
}
