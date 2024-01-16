using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ReactASPLearn.Data;

namespace ReactASPLearn.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NoteDBContext _dbContext;

        public NotesController(NoteDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetNotes()
        {
            var notes = _dbContext.Notes.ToList();
            return Ok(notes);
        }

        [HttpPost]
        public IActionResult AddNote([FromBody] Note note)
        {
            _dbContext.Notes.Add(note);
            _dbContext.SaveChanges();

            return Ok(new { success = true, message = "Note added successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult EditNote(int id, [FromBody] Note updatedNote)
        {
            var existingNote = _dbContext.Notes.Find(id);

            if (existingNote == null)
            {
                return NotFound(new { success = false, message = "Note not found" });
            }

            // Update existing note properties
            existingNote.noteTitle = updatedNote.noteTitle;
            existingNote.noteText = updatedNote.noteText;

            _dbContext.SaveChanges();

            return Ok(new { success = true, message = "Note updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var existingNote = _dbContext.Notes.Find(id);

            if (existingNote == null)
            {
                return NotFound(new { success = false, message = "Note not found" });
            }

            _dbContext.Notes.Remove(existingNote);
            _dbContext.SaveChanges();

            return Ok(new { success = true, message = "Note deleted successfully" });
        }
    }
}
