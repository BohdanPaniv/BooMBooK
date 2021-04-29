using BooMBooK.Models.ArticleComment;
using BooMBooK.Models.Comment;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class CommentService
    {
        IMongoCollection<Comment> Comments;
        public CommentService()
        {
            Comments = DataBaseService.GetMongoCollection<Comment>("Comments");
        }

        public async Task Create(Comment comment)
        {
            await Comments.InsertOneAsync(comment);
        }

        public async Task<List<Comment>> GetComments(List<ArticleComment> articleComments)
        {
            List<Comment> comments = new List<Comment>();

            foreach (var item in articleComments)
            {
                Comment findMatch = await Comments.Find(x => x.CommentId == item.CommentId).FirstOrDefaultAsync();
                
                if (findMatch != null)
                {
                    comments.Add(findMatch);
                }
            }

            return comments;
        }
    }
}
