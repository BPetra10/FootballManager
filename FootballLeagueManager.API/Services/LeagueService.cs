using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

// Handles league management operations.
namespace FootballLeagueManager.API.Services
{
    public class LeagueService
    {
        private readonly FootballLeagueDbContext _dbContext;
        public LeagueService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task CreateLeagueAsync(LeagueDto request)
        {
            var normalizedLeagueName =
                request.Name.Trim().ToLower();

            var exists = await _dbContext.Leagues
                .AnyAsync(l =>
                    l.Name.ToLower() == normalizedLeagueName);

            if (exists)
            {
                throw new Exception("League already exists.");
            }

            var league = new League
            {
                Id = Guid.NewGuid(),
                Name = request.Name.Trim(),
                MaxTeams = request.MaxTeams
            };

            _dbContext.Leagues.Add(league);

            await _dbContext.SaveChangesAsync();
        }

        // Returns all leagues with their teams.
        public async Task<List<LeagueDto>> GetAllAsync()
        {
            return await _dbContext.Leagues
                .Select(l => new LeagueDto
                {
                    Name = l.Name,
                    MaxTeams = l.MaxTeams
                })
                .ToListAsync();
        }

        public async Task<LeagueDto> GetByIdAsync(Guid leagueId)
        {
            var league = await _dbContext.Leagues
                .FirstOrDefaultAsync(l => l.Id == leagueId);

            if (league == null)
            {
                throw new Exception("League not found.");
            }

            return new LeagueDto
            {
                Name = league.Name,
                MaxTeams = league.MaxTeams
            };
        }

        public async Task UpdateAsync(Guid leagueId, LeagueDto request)
        {
            var league = await _dbContext.Leagues
                .FirstOrDefaultAsync(l => l.Id == leagueId);

            if (league == null)
            {
                throw new Exception("League not found.");
            }

            var normalizedLeagueName =
                request.Name.Trim().ToLower();

            var exists = await _dbContext.Leagues
                .AnyAsync(l =>
                    l.Name.ToLower() == normalizedLeagueName &&
                    l.Id != leagueId);

            if (exists)
            {
                throw new Exception("League already exists.");
            }

            league.Name = request.Name.Trim();
            league.MaxTeams = request.MaxTeams;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteLeagueAsync(Guid leagueId)
        {
            var league = await _dbContext.Leagues.FindAsync(leagueId);

            if (league == null)
            {
                return;
            }

            var hasTeams = await _dbContext.Teams.AnyAsync(t => t.LeagueId == leagueId);

            if (hasTeams)
            {
                throw new Exception("Cannot delete a league that still has teams.");
            }

            _dbContext.Leagues.Remove(league);

            await _dbContext.SaveChangesAsync();

        }

        // Calculates the current standings of a league.
        public async Task<List<LeagueTableRowResponse>>
            GetLeagueTableAsync(Guid leagueId)
        {
            var teams = await _dbContext.Teams
                .Where(t => t.LeagueId == leagueId)
                .ToListAsync();

            var teamIds = teams
                .Select(t => t.Id)
                .ToList();

            var matches = await _dbContext.Matches
                .Where(m =>
                    m.IsPlayed &&
                    (
                        teamIds.Contains(m.HomeTeamId) ||
                        teamIds.Contains(m.AwayTeamId)
                    ))
                .ToListAsync();

            var table = new List<LeagueTableRowResponse>();

            foreach (var team in teams)
            {
                var row = new LeagueTableRowResponse
                {
                    TeamName = team.Name
                };

                var teamMatches = matches.Where(m =>
                    m.HomeTeamId == team.Id ||
                    m.AwayTeamId == team.Id);

                foreach (var match in teamMatches)
                {
                    bool isHome = match.HomeTeamId == team.Id;

                    int goalsFor = isHome
                        ? match.HomeScore
                        : match.AwayScore;

                    int goalsAgainst = isHome
                        ? match.AwayScore
                        : match.HomeScore;

                    row.Played++;

                    row.GoalsFor += goalsFor;
                    row.GoalsAgainst += goalsAgainst;

                    if (goalsFor > goalsAgainst)
                    {
                        row.Wins++;
                        row.Points += 3;
                    }
                    else if (goalsFor == goalsAgainst)
                    {
                        row.Draws++;
                        row.Points += 1;
                    }
                    else
                    {
                        row.Losses++;
                    }
                }

                row.GoalDifference =
                    row.GoalsFor - row.GoalsAgainst;

                table.Add(row);
            }

            return table
                .OrderByDescending(t => t.Points)
                .ThenByDescending(t => t.GoalDifference)
                .ThenByDescending(t => t.GoalsFor)
                .ToList();
        }
    }
}
