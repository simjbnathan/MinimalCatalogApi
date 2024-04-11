
using Microsoft.EntityFrameworkCore;
using MinimalCatalogApi.Authentication;
using MinimalCatalogApi.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CatalogDbContext>(options =>
{
    options.UseInMemoryDatabase("CatalogDb");
});

builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IItemService, ItemService>();

builder.Services.AddAuthorization();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowOrigin");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<CatalogDbContext>();
    dbContext.Database.EnsureCreated();
    dbContext.SeedData();
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
//app.UseMiddleware<ApiKeyAuthMiddleware>();
app.UseAuthorization();



// Define controller
app.MapGet("/api/items", async (IItemService itemService) =>
{
    var items = await itemService.GetAllItemsAsync();
    return Results.Ok(items);
});

app.MapGet("/api/items/{id}", async (int id, IItemService itemService) =>
{
    var item = await itemService.GetItemByIdAsync(id);
    if (item == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(item);
});

app.MapPost("/api/items", async (Item items, IItemService itemService) =>
{
await itemService.AddItemAsync(items);

    return Results.Created($"/api/items", items);
});

app.MapPut("/api/items/{id}", async (int id, Item item, IItemService itemService) =>
{
    if (id != item.Id)
    {
        return Results.BadRequest();
    }

    try
    {
        var updatedItem  = await itemService.UpdateItemAsync(id, item);
        return Results.Ok(updatedItem);
    }
    catch (Exception)
    {
        if (await itemService.GetItemByIdAsync(id) == null)
        {
            return Results.NotFound();
        }
        throw;
    }
});

app.MapDelete("/api/items/{id}", async (int id, IItemService itemService) =>
{
    var existingItem = await itemService.GetItemByIdAsync(id);
    if (existingItem == null)
    {
        return Results.NotFound();
    }

    await itemService.DeleteItemAsync(id);
    return Results.NoContent();
});





app.Run();

