using MinimalCatalogApi.Models;

internal interface IItemService
{
    Task<List<Item>> GetAllItemsAsync();
    Task<Item> GetItemByIdAsync(int id);
    Task AddItemAsync(Item item);
    Task<Item> UpdateItemAsync(int id, Item item);
    Task DeleteItemAsync(int id);
}