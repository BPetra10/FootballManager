using System.ComponentModel.DataAnnotations;

namespace FootballLeagueManager.API.DTOs
{
    public class UpdateMatchResultRequest
    {
        [Range(0, 30)]
        public int HomeScore { get; set; }
        
        [Range(0, 30)]
        public int AwayScore { get; set; }
    }
}
