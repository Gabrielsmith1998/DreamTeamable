using DreamTeamableAPI.Models;
using DreamTeamableAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DreamTeamableAPI.Controllers
{
    [Route("api/favorites")]
    [ApiController]
    public class FavoriteController : Controller
    {
        private readonly IFavoriteRepository _favRepo;

        // ASP.NET will give us an instance of our Walker Repository. This is called "Dependency Injection"
        public FavoriteController(IFavoriteRepository favRepository)
        {
            _favRepo = favRepository;
        }
        // GET: api/<TrackController>
        [HttpGet]
        public List<Favorite> Get()
        {
            return _favRepo.GetAllFavorites();
        }

        // GET api/<TrackController>/5
        [HttpGet("{id}")]
        public Favorite Get(int id)
        {
            return _favRepo.GetFavoriteById(id);
        }

        // POST api/<TrackController>
        [HttpPost]
        public IActionResult Post(Favorite newFavorites)
        {
            _favRepo.AddFavorite(newFavorites);
            return Ok(newFavorites);
        }

        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPatch("{id}")]
        public IActionResult UpdateFavorite(int id, Favorite favorite)
        {
            if (id != favorite.Id)
            {
                return BadRequest();
            }

            var existingFav = _favRepo.GetFavoriteById(id);
            if (existingFav == null)
            {
                return NotFound();
            }
            else
            {
                _favRepo.UpdateFavorite(favorite);
                return NoContent();
            }
        }

        // DELETE api/<TrackController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAFavorite(int id)
        {
            var matchingFav = _favRepo.GetFavoriteById(id);
            if (matchingFav == null)
            {
                return NotFound();
            }
            else
            {
                _favRepo.DeleteFavorite(matchingFav.Id);
                return NoContent();
            }
        }
    }
}