using System.ComponentModel.DataAnnotations;

namespace DreamTeamableAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirebaseUserId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
