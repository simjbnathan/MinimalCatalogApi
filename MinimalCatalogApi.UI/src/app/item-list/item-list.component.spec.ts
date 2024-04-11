import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from '../services/item.service';
import { of, throwError } from 'rxjs';
import { Item } from '../models/item';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemServiceSpy: jasmine.SpyObj<ItemService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const itemServiceSpyObj = jasmine.createSpyObj('ItemService', ['getItems', 'addItem', 'updateItem', 'deleteItem']);
    const modalServiceSpyObj = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    const toastrServiceSpyObj = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceSpyObj },
        { provide: NgbModal, useValue: modalServiceSpyObj },
        { provide: ToastrService, useValue: toastrServiceSpyObj }
      ],

    }).compileComponents();

    itemServiceSpy = TestBed.inject(ItemService) as jasmine.SpyObj<ItemService>;
    modalServiceSpy = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch items on initialization', () => {
    const items: Item[] = [{ id: 1, name: 'Item 1', description: 'Description 1', category: 'Category 1' }];
    itemServiceSpy.getItems.and.returnValue(of(items));

    component.ngOnInit();

    expect(itemServiceSpy.getItems).toHaveBeenCalled();
    expect(component.items).toEqual(items);
  });




  it('should apply filter correctly when onSearchTermChange is called', () => {
    component.searchTerm = 'test';
    const items: Item[] = [
      { id: 1, name: 'Test Item 1', description: 'Description 1', category: 'Category 1' },
      { id: 2, name: 'Test Item 2', description: 'Description 2', category: 'Category 2' },
      { id: 3, name: 'Another Item', description: 'Another Description', category: 'Another Category' }
    ];
    component.items = items;

    component.onSearchTermChange();

    expect(component.filteredItems).toEqual(items.slice(0, 2)); // Only items containing 'test' in name, description, or category should be filtered
  });

  it('should update pageSize and reset currentPage when changePageSize is called', () => {
    component.pageSize = 2;
    component.currentPage = 2;

    component.changePageSize(4);

    expect(component.pageSize).toBe(4);
    expect(component.currentPage).toBe(1); // Reset currentPage to 1 after changing pageSize
  });

  it('should add a new item successfully when addItem is called', () => {
    const newItem: Item = { id: 1, name: 'New Item', description: 'New Description', category: 'New Category' };
    itemServiceSpy.addItem.and.returnValue(of(newItem));

    component.modalItem = newItem;
    component.addItem();

    expect(itemServiceSpy.addItem).toHaveBeenCalledWith(newItem);
    expect(component.items).toContain(newItem);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Item added successfully.');
  });

  it('should update an item successfully when updateItem is called', () => {
    const updatedItem: Item = { id: 1, name: 'Updated Item', description: 'Updated Description', category: 'Updated Category' };
    itemServiceSpy.updateItem.and.returnValue(of(updatedItem));

    component.modalItem = updatedItem;
    component.updateItem();

    expect(itemServiceSpy.updateItem).toHaveBeenCalledWith(updatedItem);
    expect(component.items).toContain(updatedItem);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Item updated successfully.');
  });

  it('should delete an item successfully when deleteItem is called', () => {
    const itemId = 1;
    itemServiceSpy.deleteItem.and.returnValue(of(undefined));

    component.deleteItem(itemId);

    expect(itemServiceSpy.deleteItem).toHaveBeenCalledWith(itemId);
    expect(component.items.length).toBeLessThan(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Item deleted successfully.');
  });

  it('should handle errors when adding a new item', () => {
    const error = new Error('Failed to add item');
    itemServiceSpy.addItem.and.returnValue(throwError(error));

    component.addItem();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Failed to add item.');
  });

  it('should handle errors when updating an item', () => {
    const error = new Error('Failed to update item');
    itemServiceSpy.updateItem.and.returnValue(throwError(error));

    component.updateItem();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Failed to update item.');
  });

  it('should handle errors when deleting an item', () => {
    const itemId = 1;
    const error = new Error('Failed to delete item');
    itemServiceSpy.deleteItem.and.returnValue(throwError(error));

    component.deleteItem(itemId);

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Failed to delete item.');
  });






});
