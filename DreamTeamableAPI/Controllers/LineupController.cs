using DreamTeamableAPI.Models;
using DreamTeamableAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DreamTeamableAPI.Controllers
{
    [Route("api/lineups")]
    [ApiController]
    public class LineupController : Controller
    {
        private readonly ILineupRepository _lineupRepo;

        public LineupController(ILineupRepository lineupRepository)
        {
            _lineupRepo = lineupRepository;
        }

        [HttpGet]
        public List<Lineup> Get()
        {
            return _lineupRepo.GetAllLineups();
        }

        [HttpGet("{id}")]
        public Lineup Get(int id)
        {
            return _lineupRepo.GetLineupsById(id);
        }

        [HttpPost]
        public IActionResult Post(Lineup newLineup)
        {
            _lineupRepo.AddLineup(newLineup);
            return Ok(newLineup);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateLineup(int id, Lineup lineup)
        {
            if (id != lineup.Id)
            {
                return NotFound();
            }
            else
            {
                _lineupRepo.UpdateLineup(lineup);
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLineup(int id)
        {
            var matchingLineup = _lineupRepo.GetLineupsById(id);
            if (matchingLineup == null)
            {
                return NotFound();
            }
            else
            {
                _lineupRepo.DeleteLineup(matchingLineup.Id);
                return NoContent();
            }
        }
    }
}
