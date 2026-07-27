using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballLeagueManager.API.Services
{
    public class AdminService
    {
        private readonly FootballLeagueDbContext _dbContext;

        public AdminService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AdminDashboardDto> GetDashboardAsync()
        {
            return new AdminDashboardDto
            {
                Leagues = await _dbContext.Leagues.CountAsync(),

                Teams = await _dbContext.Teams.CountAsync(),

                Managers = await _dbContext.Users.CountAsync(
                    u => u.Role == UserRole.TeamManager),

                Matches = await _dbContext.Matches.CountAsync()
            };
        }
    }
}