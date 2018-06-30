﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using hzero.efcorecodefirst.DataModel;

namespace hzero.efcorecodefirst.DataModel.Migrations
{
    [DbContext(typeof(DataModelDbContext))]
    partial class DataModelDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("hzero.efcorecodefirst.DataModel.BasketballCourt", b =>
                {
                    b.Property<Guid>("Uid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<int>("Format");

                    b.Property<decimal>("Latitude");

                    b.Property<int>("Location");

                    b.Property<decimal>("Longitude");

                    b.HasKey("Uid");

                    b.ToTable("BasketballCourts");
                });

            modelBuilder.Entity("hzero.efcorecodefirst.DataModel.Player", b =>
                {
                    b.Property<Guid>("Uid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("UserName");

                    b.HasKey("Uid");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("hzero.efcorecodefirst.DataModel.Rating", b =>
                {
                    b.Property<Guid>("Uid")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BasketballCourtUid");

                    b.Property<string>("Comment");

                    b.Property<Guid>("PlayerId");

                    b.Property<int>("Score");

                    b.HasKey("Uid");

                    b.HasIndex("BasketballCourtUid");

                    b.HasIndex("PlayerId")
                        .IsUnique();

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("hzero.efcorecodefirst.DataModel.Rating", b =>
                {
                    b.HasOne("hzero.efcorecodefirst.DataModel.BasketballCourt")
                        .WithMany("Ratings")
                        .HasForeignKey("BasketballCourtUid");

                    b.HasOne("hzero.efcorecodefirst.DataModel.Player", "Player")
                        .WithOne()
                        .HasForeignKey("hzero.efcorecodefirst.DataModel.Rating", "PlayerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}