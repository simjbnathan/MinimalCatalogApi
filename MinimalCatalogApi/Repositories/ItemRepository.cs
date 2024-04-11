using Microsoft.EntityFrameworkCore;
using MinimalCatalogApi.Models;

internal class ItemRepository : IItemRepository
{
    private readonly CatalogDbContext _dbContext;

    public ItemRepository(CatalogDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task AddItemAsync(Item item)
    {
        _dbContext.Items.Add(item);
        await _dbContext.SaveChangesAsync();

    }

    public async Task DeleteItemAsync(int id)
    {
        var item = await _dbContext.Items.FindAsync(id);
        if (item != null)
        {
            _dbContext.Items.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<List<Item>> GetAllItemsAsync()
    {
        return await _dbContext.Items.ToListAsync();
    }



    public async Task<Item> GetItemByIdAsync(int id)
    {
        return await _dbContext.Items.FindAsync(id);
    }

    public async Task<Item> UpdateItemAsync(int id, Item item)
    {
        var existingItem = await _dbContext.Items.FindAsync(id);
        if (existingItem == null)
        {
            throw new InvalidOperationException("Item not found");
        }
        else
        {
            _dbContext.Entry(existingItem).CurrentValues.SetValues(item);
            await _dbContext.SaveChangesAsync();
            return existingItem;
        }
    }

}