using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

// Represents the application's database context and managed entities.
namespace FootballLeagueManager.API.Data
{
    public class FootballLeagueDbContext(DbContextOptions<FootballLeagueDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        // Provides database access to leagues and teams.
        public DbSet<League> Leagues { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Match> Matches { get; set; }

        // Configures relationships between entities. 1:1 relationship between team and manager.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Team)
                .WithOne(t => t.Manager)
                .HasForeignKey<Team>(t => t.ManagerId);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<League>()
                .HasIndex(l => l.Name)
                .IsUnique();

            modelBuilder.Entity<Team>()
                .HasIndex(t => t.Name)
                .IsUnique();

            modelBuilder.Entity<Team>()
                .HasIndex(t => t.ManagerId)
                .IsUnique();
        }
    }
}