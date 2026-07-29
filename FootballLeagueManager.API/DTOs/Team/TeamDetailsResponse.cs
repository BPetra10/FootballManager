public class TeamDetailsResponse
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string LeagueName { get; set; } = string.Empty;

    public string ManagerName { get; set; } = string.Empty;

    public int PlayerCount { get; set; }

    public double AverageAge { get; set; }
}