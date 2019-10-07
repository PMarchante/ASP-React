using System.Linq;
using AutoMapper;
using Domain;

namespace App.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>()
            .ForMember(d => d.Username, o => o.MapFrom(a => a.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(a => a.Author.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(a => a.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}