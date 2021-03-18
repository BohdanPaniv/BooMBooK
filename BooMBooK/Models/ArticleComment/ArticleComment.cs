using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.ArticleComment
{
    public class ArticleComment
    {
        [Display(Name = "ArticleId")]
        public string ArticleId { get; set; }

        [Display(Name = "CommentId")]
        public string CommentId { get; set; }
    }
}
