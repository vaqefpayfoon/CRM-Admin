﻿// <auto-generated />
using System;
using CarrierAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarrierAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20191023194622_projectsRoles")]
    partial class projectsRoles
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CarrierDomain.Models.City", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CityName");

                    b.Property<Guid>("CountryId");

                    b.Property<DateTime>("CreatedAt");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("CarrierDomain.Models.Country", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CountryName");

                    b.Property<DateTime>("CreatedAt");

                    b.HasKey("Id");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("CarrierDomain.Models.ModelsAttribute", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AttributeName");

                    b.Property<string>("AttributeValue");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("RelatedObjectId");

                    b.HasKey("Id");

                    b.ToTable("ModelsAttributes");
                });

            modelBuilder.Entity("CarrierDomain.Models.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Barcode");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("MoreInfo");

                    b.Property<string>("PersonName");

                    b.Property<string>("ProductName");

                    b.Property<string>("Serial");

                    b.Property<Guid>("SupcustId");

                    b.HasKey("Id");

                    b.HasIndex("SupcustId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("CarrierDomain.Models.ProjectType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("ProjectTitle");

                    b.Property<int>("RoleState");

                    b.HasKey("Id");

                    b.ToTable("ProjectTypes");
                });

            modelBuilder.Entity("CarrierDomain.Models.StoreFile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Extension");

                    b.Property<byte[]>("FileBytes");

                    b.Property<string>("FileName");

                    b.Property<Guid>("RelatedObjectId");

                    b.Property<string>("TableName");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("FileStores");
                });

            modelBuilder.Entity("CarrierDomain.Models.Supcust", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<Guid>("CityId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Email");

                    b.Property<string>("MoreInfo");

                    b.Property<string>("Phone");

                    b.Property<string>("SupcustName");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Supcusts");
                });

            modelBuilder.Entity("CarrierDomain.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CityId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("FullName");

                    b.Property<string>("MoreInfo");

                    b.Property<string>("NationalCode");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Phone");

                    b.Property<string>("PhotoUrl");

                    b.Property<int>("UserRole");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CarrierDomain.Models.UsersProject", b =>
                {
                    b.Property<Guid>("AdminUserId");

                    b.Property<Guid>("UserId");

                    b.Property<string>("AdminOrder");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("DateRefer");

                    b.Property<double>("Discount");

                    b.Property<double>("FactorAmount");

                    b.Property<DateTime>("FactorDate");

                    b.Property<string>("FactorNo");

                    b.Property<DateTime>("FinishDate");

                    b.Property<bool>("FinishProject");

                    b.Property<Guid>("Id");

                    b.Property<string>("MoreInfo");

                    b.Property<Guid>("ProductId");

                    b.Property<bool>("ProjectActive");

                    b.Property<int>("ProjectState");

                    b.Property<Guid>("ProjectTypeId");

                    b.Property<Guid>("SupcustId");

                    b.Property<int>("Tax");

                    b.Property<DateTime>("ToDoDate");

                    b.HasKey("AdminUserId", "UserId");

                    b.HasIndex("ProductId");

                    b.HasIndex("ProjectTypeId");

                    b.HasIndex("SupcustId");

                    b.HasIndex("UserId");

                    b.ToTable("UsersProjects");
                });

            modelBuilder.Entity("CarrierDomain.Models.City", b =>
                {
                    b.HasOne("CarrierDomain.Models.Country", "Country")
                        .WithMany("Cities")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarrierDomain.Models.Product", b =>
                {
                    b.HasOne("CarrierDomain.Models.Supcust", "Supcust")
                        .WithMany("Products")
                        .HasForeignKey("SupcustId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarrierDomain.Models.Supcust", b =>
                {
                    b.HasOne("CarrierDomain.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarrierDomain.Models.User", b =>
                {
                    b.HasOne("CarrierDomain.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarrierDomain.Models.UsersProject", b =>
                {
                    b.HasOne("CarrierDomain.Models.User", "AdminUser")
                        .WithMany("AdminUsers")
                        .HasForeignKey("AdminUserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CarrierDomain.Models.Product", "Product")
                        .WithMany("UsersProjects")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CarrierDomain.Models.ProjectType", "ProjectType")
                        .WithMany("UsersProjects")
                        .HasForeignKey("ProjectTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarrierDomain.Models.Supcust", "Supcust")
                        .WithMany("UsersProjects")
                        .HasForeignKey("SupcustId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CarrierDomain.Models.User", "User")
                        .WithMany("Users")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}