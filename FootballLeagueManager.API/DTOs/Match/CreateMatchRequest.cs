using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs.Match
{
    public class CreateMatchRequest
    {
        public Guid HomeTeamId { get; set; }
        public Guid AwayTeamId { get; set; }
        public DateTime MatchDate { get; set; }
    }
}