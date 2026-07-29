namespace FootballLeagueManager.API.DTOs.Auth
{
    public class LoginResponse
    {
        //Represents the JWT token returned after a successful login.
        public string Token { get; set; } = string.Empty;
    }
}
