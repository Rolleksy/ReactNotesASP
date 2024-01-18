using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using ReactASPLearn.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connStr = builder.Configuration.GetConnectionString("NoteDB");

builder.Services.AddDbContext<NoteDBContext>(options => options.UseSqlServer(connStr));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5209", "https://localhost:44414"/*, "https://localhost:7186"*/) // Zaktualizuj ten adres URL do adresu swojej aplikacji React
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
                
    });
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // W trybie deweloperskim mo¿esz dodatkowo skonfigurowaæ CORS, ale to jest opcjonalne.
    app.UseCors();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
