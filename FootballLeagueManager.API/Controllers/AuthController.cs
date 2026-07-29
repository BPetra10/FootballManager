using FootballLeagueManager.API.DTOs.Auth;
using FootballLeagueManager.API.DTOs.Common;
using FootballLeagueManager.API.Exceptions;
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

        [HttpGet("admin-exists")]
        public async Task<IActionResult> AdminExists()
        {
            var exists = await _authService.AdminExistsAsync();

            return Ok(exists);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            try
            {
                await _authService.RegisterAsync(request);

                return Ok(new
                {
                    message = "User created successfully."
                });
            }
            catch (ValidationErrorsException ex)
            {
                return BadRequest(new ErrorResponse
                {
                    Errors = ex.Errors
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _authService.LoginAsync(request);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid username/email or password."
                });
            }

            var token = _jwtService.GenerateToken(user);

            return Ok(new LoginResponse
            {
                Token = token
            });
        }

        // Returns information about the currently authenticated user.
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