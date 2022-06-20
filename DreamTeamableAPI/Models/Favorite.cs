using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace DreamTeamableAPI.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        [ValidateNever]
        public string FavoriteUid { get; set; }
        [ValidateNever]
        public string LineupId { get; set; }
    }
}
