using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs.Auth;
using FootballLeagueManager.API.Exceptions;
using FootballLeagueManager.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> AdminExistsAsync()
        {
            return await _dbContext.Users
                .AnyAsync(u => u.Role == UserRole.Admin);
        }

        public async Task RegisterAsync(RegisterRequest request)
        {
            var errors = new Dictionary<string, string>();

            var normalizedUsername =
                request.Username.Trim().ToLower();

            var normalizedEmail =
                request.Email.Trim().ToLower();

            if (await _dbContext.Users.AnyAsync(
                u => u.Username.ToLower() == normalizedUsername))
            {
                errors["username"] = "This username is already taken.";
            }

            if (await _dbContext.Users.AnyAsync(
                u => u.Email.ToLower() == normalizedEmail))
            {
                errors["email"] = "An account with this email already exists.";
            }

            if (errors.Any())
            {
                throw new ValidationErrorsException(errors);
            }

            var adminExists = await _dbContext.Users
                .AnyAsync(u => u.Role == UserRole.Admin);

            var role = adminExists
                ? UserRole.TeamManager
                : UserRole.Admin;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username.Trim(),
                Email = normalizedEmail,
                Role = role
            };

            user.PasswordHash =
                _passwordHasher.HashPassword(user, request.Password);

            _dbContext.Users.Add(user);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<User?> LoginAsync(LoginRequest request)
        {
            var normalizedLogin =
                request.UsernameOrEmail.Trim().ToLower();

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u =>
                    u.Username.ToLower() == normalizedLogin ||
                    u.Email.ToLower() == normalizedLogin);

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