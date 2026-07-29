using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs.Match;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballLeagueManager.API.Services
{
    public class MatchService
    {
        private readonly FootballLeagueDbContext _dbContext;

        public MatchService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateMatchAsync(CreateMatchRequest request)
        {
            if (request.HomeTeamId == request.AwayTeamId)
            {
                throw new Exception("A team cannot play against itself.");
            }

            var homeTeamExists = await _dbContext.Teams
                .AnyAsync(t => t.Id == request.HomeTeamId);

            var awayTeamExists = await _dbContext.Teams
                .AnyAsync(t => t.Id == request.AwayTeamId);

            if (!homeTeamExists || !awayTeamExists)
            {
                throw new Exception("One or both teams do not exist.");
            }

            var exists = await _dbContext.Matches
                .AnyAsync(m =>
                    m.HomeTeamId == request.HomeTeamId &&
                    m.AwayTeamId == request.AwayTeamId &&
                    m.MatchDate == request.MatchDate);

            if (exists)
            {
                throw new Exception("Match already exists.");
            }

            var match = new Match
            {
                Id = Guid.NewGuid(),
                HomeTeamId = request.HomeTeamId,
                AwayTeamId = request.AwayTeamId,
                MatchDate = request.MatchDate,
                HomeScore = 0,
                AwayScore = 0,
                IsPlayed = false
            };

            _dbContext.Matches.Add(match);

            await _dbContext.SaveChangesAsync();
        }
        public async Task<List<MatchListItemDto>> GetAllAsync()
        {
            return await _dbContext.Matches
                .Select(m => new MatchListItemDto
                {
                    Id = m.Id,
                    HomeTeamName = m.HomeTeam.Name,
                    AwayTeamName = m.AwayTeam.Name,
                    MatchDate = m.MatchDate,
                    IsPlayed = m.IsPlayed,
                    HomeScore = m.HomeScore,
                    AwayScore = m.AwayScore
                })
                .ToListAsync();
        }

        public async Task<MatchListItemDto> GetByIdAsync(Guid matchId)
        {
            var match = await _dbContext.Matches
                .Where(m => m.Id == matchId)
                .Select(m => new MatchListItemDto
                {
                    Id = m.Id,
                    HomeTeamName = m.HomeTeam.Name,
                    AwayTeamName = m.AwayTeam.Name,
                    MatchDate = m.MatchDate,
                    IsPlayed = m.IsPlayed,
                    HomeScore = m.HomeScore,
                    AwayScore = m.AwayScore
                })
                .FirstOrDefaultAsync();

            if (match == null)
            {
                throw new Exception("Match not found.");
            }

            return match;
        }

        public async Task DeleteAsync(Guid matchId)
        {
            var match = await _dbContext.Matches
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                return;
            }

            _dbContext.Matches.Remove(match);

            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateResultAsync(
            Guid matchId,
            UpdateMatchResultRequest request)
        {
            var match = await _dbContext.Matches
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                throw new Exception("Match not found.");
            }

            if (request.HomeScore < 0 ||
                request.AwayScore < 0)
            {
                throw new Exception("Scores cannot be negative.");
            }

            match.HomeScore = request.HomeScore;
            match.AwayScore = request.AwayScore;
            match.IsPlayed = true;

            await _dbContext.SaveChangesAsync();
        }
    }
}