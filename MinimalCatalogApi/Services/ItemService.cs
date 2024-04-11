using MinimalCatalogApi.Models;

internal class ItemService : IItemService
{
    private readonly IItemRepository _itemRepository;

    public ItemService(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository ?? throw new ArgumentNullException(nameof(itemRepository));
    }



    public Task<Item> GetItemByIdAsync(int id)
    {
        return _itemRepository.GetItemByIdAsync(id);
    }

    public Task AddItemAsync(Item item)
    {
        return _itemRepository.AddItemAsync(item);
    }

    public Task<Item> UpdateItemAsync(int id, Item item)
    {
        return _itemRepository.UpdateItemAsync(id, item);
    }

    public Task DeleteItemAsync(int id)
    {
        return _itemRepository.DeleteItemAsync(id);
    }

    public Task<List<Item>> GetAllItemsAsync()
    {
        return _itemRepository.GetAllItemsAsync();
    }
}