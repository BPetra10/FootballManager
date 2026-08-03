namespace FootballLeagueManager.API.DTOs.Admin
{
    public class TeamWithoutManagerDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}