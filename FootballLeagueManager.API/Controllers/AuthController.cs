using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// Provides authentication related endpoints.
namespace FootballLeagueManager.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly JwtService _jwtService;
        public AuthController(
            AuthService authService,
            JwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            await _authService.RegisterAsync(request);

            return Ok("User created successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _authService.LoginAsync(request);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _jwtService.GenerateToken(user);

            return Ok(new LoginResponse
            {
                Token = token
            });
        }

        //Returns information about the currently authenticated user.
        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                Username = User.Identity?.Name,
                Role = User.FindFirst(ClaimTypes.Role)?.Value
            });
        }
    }
}