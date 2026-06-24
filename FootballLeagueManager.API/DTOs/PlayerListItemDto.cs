namespace FootballLeagueManager.API.DTOs
{
    public class PlayerListItemDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
    }
}
