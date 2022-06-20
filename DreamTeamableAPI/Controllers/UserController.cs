using DreamTeamableAPI.Models;
using DreamTeamableAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
        [HttpGet]
        public List<User> Get()
        {
            return _userRepo.GetAllUsers();
        }

        [Authorize]
        [HttpGet("{firebaseUserId}")]
        public User GetUserByFirebaseUid(string firebaseUserId)
        {
            return _userRepo.GetUserByFirebaseUid(firebaseUserId);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var matchingUser = _userRepo.GetUserByFirebaseUid(firebaseUserId);
            if (matchingUser == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult Post(User newUser)
        {
            _userRepo.AddUser(newUser);
            return CreatedAtAction(
                nameof(GetUserByFirebaseUid), new { firebaseUserId = newUser.FirebaseUserId }, newUser);
        }

        [Authorize]
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

        [Authorize]
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
