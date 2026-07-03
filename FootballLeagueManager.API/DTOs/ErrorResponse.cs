namespace FootballLeagueManager.API.DTOs
{
    public class ErrorResponse
    {
        public Dictionary<string, string> Errors { get; set; }
            = new();
    }
}