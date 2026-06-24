using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

// Handles user registration and authentication logic.
namespace FootballLeagueManager.API.Services
{
    public class AuthService
    {
        private readonly FootballLeagueDbContext _dbContext;
        private readonly PasswordHasher<User> _passwordHasher = new();

        public AuthService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task RegisterAsync(RegisterRequest request)
        {
            var normalizedUsername =
                request.Username.Trim().ToLower();

            var normalizedEmail =
                request.Email.Trim().ToLower();

            if (await _dbContext.Users.AnyAsync(
                u => u.Email.ToLower() == normalizedEmail))
            {
                throw new Exception("Email already exists.");
            }

            if (await _dbContext.Users.AnyAsync(
                u => u.Username.ToLower() == normalizedUsername))
            {
                throw new Exception("User already exists.");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username.Trim(),
                Email = normalizedEmail,
                Role = UserRole.TeamManager
            };

            user.PasswordHash =
                _passwordHasher.HashPassword(user, request.Password);

            _dbContext.Users.Add(user);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<User?> LoginAsync(LoginRequest request)
        {
            var normalizedUsername =
                request.Username.Trim().ToLower();

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(
                    u => u.Username.ToLower() == normalizedUsername);

            if (user == null)
            {
                return null;
            }

            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password);

            return result == PasswordVerificationResult.Success
                ? user
                : null;
        }
    }
}