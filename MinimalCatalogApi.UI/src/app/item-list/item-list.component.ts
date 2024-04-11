import { Component, OnInit, TemplateRef } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  items: Item[] = [];
  newItem: Item = { id: 0, name: '', description: '', category: '' };
  modalItem: Item = { id: 0, name: '', description: '', category: '' };
  loading$: any;
  total: number = 10;

  pageSize = 2;
  currentPage = 1;

  editingItemId: number | null = null;
  filteredItems: Item[] = []; // Array to store filtered items
  searchTerm: string = ''; // Search term entered by the user
  toastMessage!: string;

  constructor(
    private itemService: ItemService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  openEditModal(template: TemplateRef<any>, item: Item): void {
    this.modalItem = { ...item };
    this.modalService.open(template);
  }

  openAddModal(_t18: TemplateRef<any>) {
    this.modalService.open(_t18);
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchTermChange(): void {
    this.applyFilter();
  }

  get pagedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.items.slice(startIndex, startIndex + this.pageSize);
  }

  changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset current page to 1 when page size changes
  }

  saveItem(): void {
    if (!this.modalItem) {
      console.error('Modal item is null.');
      this.toastr.error('ModalItem is null.');
      return;
    }
    if (this.modalItem.id && this.modalItem.id > 0) {
      this.updateItem();
    } else {
      this.addItem();
    }
  }

  updateItem(): void {
    this.itemService.updateItem(this.modalItem!).subscribe({
      next: updatedItem => {
        console.log(updatedItem);
        if (updatedItem !== null) {
          const index = this.items.findIndex(item => item.id === updatedItem.id);
          if (index !== -1) {
            this.items[index] = updatedItem;
          }
          this.toastMessage = 'Item updated successfully.';
          this.toastr.success('Item updated successfully.');
        }
        this.closeModalAndRefreshList();
      },
      error: error => {
        console.error(error);
        this.toastr.error('Failed to update item.');
        this.closeModalAndRefreshList();
      }
    });
  }

  addItem(): void {
    this.itemService.addItem(this.modalItem!).subscribe({
      next: newItem => {
        this.items.push(newItem);
        this.toastr.success('Item added successfully.');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Failed to add item.');
      },
      complete: () => {
        this.closeModalAndRefreshList();
      }
    });
  }

  cancelEdit(): void {
    this.editingItemId = null;
    this.getItems();
  }

  closeModalAndRefreshList(): void {
    this.modalService.dismissAll();
    this.getItems();
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.toastr.success('Item deleted successfully.');
        this.getItems();
      },
      error: error => {
        console.error(error);
        this.toastr.error('Failed to delete item.');
        this.getItems();
      }
    });
  }

}
