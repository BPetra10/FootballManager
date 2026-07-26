using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballLeagueManager.API.Data
{
    public class FootballLeagueDbContext(DbContextOptions<FootballLeagueDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        public DbSet<League> Leagues { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Player> Players { get; set; }

        public DbSet<FieldPlayerStats> FieldPlayerStats { get; set; }

        public DbSet<GoalkeeperStats> GoalkeeperStats { get; set; }

        public DbSet<Match> Matches { get; set; }

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

            modelBuilder.Entity<FieldPlayerStats>()
                .HasKey(s => s.PlayerId);

            modelBuilder.Entity<GoalkeeperStats>()
                .HasKey(s => s.PlayerId);

            modelBuilder.Entity<Player>()
                .HasOne(p => p.FieldPlayerStats)
                .WithOne(s => s.Player)
                .HasForeignKey<FieldPlayerStats>(s => s.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Player>()
                .HasOne(p => p.GoalkeeperStats)
                .WithOne(s => s.Player)
                .HasForeignKey<GoalkeeperStats>(s => s.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}