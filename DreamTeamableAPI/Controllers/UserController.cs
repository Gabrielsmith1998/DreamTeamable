using DreamTeamableAPI.Models;
using DreamTeamableAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DreamTeamableAPI.Controllers
{
    [Route("api/dtUsers")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        // GET: PlayerController
        [HttpGet]
        public List<User> Get()
        {
            return _userRepo.GetAllUsers();
        }

        [HttpGet("{firebaseUserId}")]
        public User Get(string firebaseUserId)
        {
            return _userRepo.GetUserByFirebaseUid(firebaseUserId);
        }

        [HttpPost]
        public IActionResult Post(User newUser)
        {
            _userRepo.AddUser(newUser);
            return Ok(newUser);
        }

        [HttpPatch("{firebaseUserId}")]
        public IActionResult UpdateUser(string firebaseUserId, User user)
        {
            if(firebaseUserId != user.FirebaseUserId)
            {
                return BadRequest();
            }

            var existingUser = _userRepo.GetUserByFirebaseUid(firebaseUserId);
            if(existingUser == null)
            {
                return NotFound();
            }
            else
            {
                _userRepo.UpdateUser(user);
                return NoContent();
            }
        }

        [HttpDelete("{firebaseUserId}")]
        public IActionResult DeleteUser(string firebaseUserId)
        {
            var userfbKey = _userRepo.GetUserByFirebaseUid(firebaseUserId);
            if (userfbKey == null)
            {
                return NotFound();
            }
            else
            {
                _userRepo.DeleteUser(firebaseUserId);
                return NoContent();
            }
        }
    }
}
