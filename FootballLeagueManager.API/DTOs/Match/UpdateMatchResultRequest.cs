using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs.Match
{
    public class UpdateMatchResultRequest
    {
        [Range(0, 30)]
        public int HomeScore { get; set; }
        
        [Range(0, 30)]
        public int AwayScore { get; set; }
    }
}
