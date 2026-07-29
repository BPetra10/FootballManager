public class PlayerListItemDto
{
    public Guid Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public int Age { get; set; }

    public string Position { get; set; } = string.Empty;

    public string TeamName { get; set; } = string.Empty;
}