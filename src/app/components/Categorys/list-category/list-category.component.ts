import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CategorysService } from 'src/app/Services/categorys.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})


export class ListCategoryComponent implements OnInit {
  ListCategorys: any = [];
  public pCurrent: number = 1;
  private _categoryService = inject(CategorysService);
  constructor() {}


  ngOnInit(): void {
    this.getCategorys();
  }

  getCategorys() {
    this._categoryService.getAll().subscribe((data) => {
      this.ListCategorys = data;
    });
  }

  Delete(Id: number) {
    this._categoryService.Delete(Id).subscribe({
      next: (res) => {
        this.getCategorys();
      },
      error: (e: HttpErrorResponse) => {
      },
    });
  }
}
