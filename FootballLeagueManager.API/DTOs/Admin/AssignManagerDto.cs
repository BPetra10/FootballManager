namespace FootballLeagueManager.API.DTOs.Admin
{
    public class AssignManagerDto
    {
        public Guid TeamId { get; set; }

        public Guid ManagerId { get; set; }
    }
}