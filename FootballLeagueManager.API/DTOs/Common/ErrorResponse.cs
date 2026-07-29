namespace FootballLeagueManager.API.DTOs.Common
{
    public class ErrorResponse
    {
        public Dictionary<string, string> Errors { get; set; }
            = new();
    }
}