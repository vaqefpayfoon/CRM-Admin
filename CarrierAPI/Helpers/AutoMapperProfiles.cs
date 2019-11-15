using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CarrierAPI.Data;
using CarrierAPI.Dtos;
using CarrierDomain.Models;

namespace CarrierAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            // .ForMember(woak => woak.CityId, opt => {
            //     opt.MapFrom(put => repo.Cities.FirstOrDefault(x => x.CityName == put.CityName));
            // });
            CreateMap<User, UserForDetailedDto>().ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            }).ForMember(des => des.CityName, opt => {
                opt.MapFrom(woak => woak.City.CityName);
            });
            CreateMap<UserForUpdateDto, User>();
            CreateMap<CityDto, City>();
            CreateMap<City, CityDto>().ForMember(des => des.CountryName, opt => {
                opt.MapFrom(woak => woak.Country.CountryName);
            });
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForUpdateDto>();

            CreateMap<Product, ProductRegisterDto>();
            CreateMap<ProductRegisterDto, Product>();
            CreateMap<Supcust, SupcustRegisterDto>().ForMember(des => des.CityName, opt => {
                opt.MapFrom(woak => woak.City.CityName);
            });
            CreateMap<SupcustRegisterDto, Supcust>();
            CreateMap<ModelsAttribute, AttributeDto>();

            CreateMap<ProjectHeaderDto, UsersProject>();
            CreateMap<ProjectDetailDto, UsersProject>();
            CreateMap<ProjectFinanceDto, UsersProject>();

            CreateMap<UsersProject, ProjectHeaderDto>().ForMember(des => des.SupcustName, opt => {
                opt.MapFrom(woak => woak.Supcust.SupcustName);
            }).ForMember(des => des.ProductName, opt => {
                opt.MapFrom(woak => woak.Product.ProductName);
            }).ForMember(des => des.UserName, opt => {
                opt.MapFrom(woak => woak.User.Username);
            }).ForMember(des => des.AdminUser, opt => {
                opt.MapFrom(woak => woak.AdminUser.Username);
            }).ForMember(des => des.ProjectTitle, opt => {
                opt.MapFrom(woak => woak.ProjectType.ProjectTitle);
            });
            CreateMap<UsersProject, ProjectDetailDto>().ForMember(des => des.SupcustName, opt => {
                opt.MapFrom(woak => woak.Supcust.SupcustName);
            }).ForMember(des => des.ProductName, opt => {
                opt.MapFrom(woak => woak.Product.ProductName);
            }).ForMember(des => des.UserName, opt => {
                opt.MapFrom(woak => woak.User.Username);
            }).ForMember(des => des.AdminUser, opt => {
                opt.MapFrom(woak => woak.AdminUser.Username);
            }).ForMember(des => des.ProjectTitle, opt => {
                opt.MapFrom(woak => woak.ProjectType.ProjectTitle);
            });
            CreateMap<UsersProject, ProjectFinanceDto>().ForMember(des => des.SupcustName, opt => {
                opt.MapFrom(woak => woak.Supcust.SupcustName);
            }).ForMember(des => des.ProductName, opt => {
                opt.MapFrom(woak => woak.Product.ProductName);
            }).ForMember(des => des.UserName, opt => {
                opt.MapFrom(woak => woak.User.Username);
            }).ForMember(des => des.AdminUser, opt => {
                opt.MapFrom(woak => woak.AdminUser.Username);
            }).ForMember(des => des.ProjectTitle, opt => {
                opt.MapFrom(woak => woak.ProjectType.ProjectTitle);
            });

            CreateMap<SupcustGoodDto, SupcustGood>();
            CreateMap<SupcustGood, SupcustGoodDto>().ForMember(des => des.SupcustName, opt => {
                opt.MapFrom(woak => woak.Supcust.SupcustName);}).ForMember(des => des.ProductName, opt => {
                opt.MapFrom(woak => woak.Product.ProductName);
            });

            CreateMap<ChargeDto, Charge>();
            CreateMap<Charge, ChargeDto>().ForMember(des => des.CityName, opt => {
                opt.MapFrom(woak => woak.City.CityName);
            }).ForMember(des => des.UserName, opt => {
                opt.MapFrom(woak => woak.User.Username);
            });
        }
    }
}