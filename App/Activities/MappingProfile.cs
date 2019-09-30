using System.Linq;
using AutoMapper;
using Domain;

namespace App.Activities
{
    public class MappingProfile : Profile
    {
        //convention based mapping by name of the property
        public MappingProfile()
        {
            //creates map from and to
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}