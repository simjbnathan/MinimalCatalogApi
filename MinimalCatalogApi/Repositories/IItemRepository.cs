using MinimalCatalogApi.Models;

internal interface IItemRepository
{
    Task AddItemAsync(Item item);
    Task DeleteItemAsync(int id);
    Task<List<Item>> GetAllItemsAsync();
    Task<Item> GetItemByIdAsync(int id);
    Task<Item> UpdateItemAsync(int id, Item item);
}