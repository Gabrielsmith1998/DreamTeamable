using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace DreamTeamableAPI.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string PlayerName { get; set; }
        public string Position { get; set; }
        public string ActiveOrRetired { get; set; }
        [ValidateNever]
        public decimal Avg { get; set; }
        [ValidateNever]
        public string? Hits { get; set; }
        [ValidateNever]
        public string? HomeRuns { get; set; }
        [ValidateNever]
        public string? Walks { get; set; }
        [ValidateNever]
        public decimal ERA { get; set; }
        [ValidateNever]
        public string? Strikeouts { get; set; }
        [ValidateNever]
        public string? Wins { get; set; }
        [ValidateNever]
        public string? Losses { get; set; }
        [ValidateNever]
        public string? Saves { get; set; }

}
}
