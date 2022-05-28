using DreamTeamableAPI.Models;
using DreamTeamableAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DreamTeamableAPI.Controllers
{
    [Route("api/players")]
    [ApiController]
    public class PlayerController : Controller
    {
        private readonly IPlayerRepository _playerRepo;
        
        public PlayerController(IPlayerRepository playerRepository)
        {
            _playerRepo = playerRepository;
        }
        // GET: PlayerController
        [HttpGet]
        public List<Player> Get()
        {
            return _playerRepo.GetAllPlayers();
        }

        [HttpGet("{id}")]
        public Player Get(int id)
        {
            return _playerRepo.GetPlayerById(id);
        }

        [HttpPost]
        public IActionResult Post(Player newPlayer)
        {
            _playerRepo.AddPlayer(newPlayer);
            return Ok(newPlayer);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdatePlayer(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }

            var existingPlayer = _playerRepo.GetPlayerById(id);
            if (existingPlayer == null)
            {
                return NotFound();
            }
            else
            {
                _playerRepo.UpdatePlayer(player);
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlayer(int id)
        {
            var trackD = _playerRepo.GetPlayerById(id);
            if (trackD == null)
            {
                return NotFound();
            }
            else
            {
                _playerRepo.DeletePlayer(trackD.Id);
                return NoContent();
            }
        }
    }
}
