using Microsoft.EntityFrameworkCore;

namespace ReactASPLearn.Data
{
    public class NoteDBContext : DbContext
    {
        public DbSet<Note> Notes { get; set;}

        public NoteDBContext(DbContextOptions<NoteDBContext> options) : base(options)
        {
        }
    }
}
