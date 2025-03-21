import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';
import { CreateCustomerComponent } from "../create-customer/create-customer.component";

@Component({
  selector: 'app-customers',
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    CreateCustomerComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customersService = inject(CustomersService)

  customers: Customer[] = this.customersService.customers
  showCustomersDialog: boolean = false
  markedCells: HTMLTableCellElement[] = []
  selection: Customer[] = []
  private lastMarkedCell: HTMLTableCellElement | null = null

  private toggleSelectBound = (event: KeyboardEvent) => this.toggleSelect(event)
  private toggleMoveBound = (event: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      this.moveMarkedCell(event.key)
    }
  }

  ngOnInit() {
    window.addEventListener('keyup', this.toggleSelectBound)
    window.addEventListener('keydown', this.toggleMoveBound)
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'a') {
        event.preventDefault()
        this.markAllCells()
      }
    })
  }

  ngOnDestroy() {
    window.removeEventListener('keyup', this.toggleSelectBound)
    window.removeEventListener('keydown', this.toggleMoveBound)
  }

  openCustomer(index: number) {
    this.customersService.selectedCustomer = this.customersService.customers[index]
    this.customersService.showCustomerDialog.update(value => !value)
  }

  toggleSelect(event: KeyboardEvent) {
    const allRows = Array.from(document.querySelectorAll("tbody tr")) as HTMLTableRowElement[]

    if (event.key === "Insert") {
      const rowsToMark = new Set<HTMLTableRowElement>()
      for (const cell of this.markedCells) {
        const row = cell.closest("tr") as HTMLTableRowElement
        if (row) rowsToMark.add(row)
      }

      rowsToMark.forEach(row => {
        row.classList.add("!bg-sky-800", "!text-white")
        const index = allRows.indexOf(row)
        const customer = this.customers[index]
        if (customer) this.selection.push(customer)
      })

      if (this.lastMarkedCell && this.markedCells.length === 1) this.moveMarkedCell("ArrowDown")
    }

    if (event.key === "Delete") {
      const rowsToUnmark = new Set<HTMLTableRowElement>()
      for (const cell of this.markedCells) {
        const row = cell.closest("tr") as HTMLTableRowElement
        if (row) rowsToUnmark.add(row)
      }

      rowsToUnmark.forEach(row => {
        row.classList.remove("!bg-sky-800", "!text-white")
        const index = allRows.indexOf(row)
        const customer = this.customers[index]
        if (customer) {
          this.selection = this.selection.filter(c => c.id !== customer.id)
        }
      })
    }

    if (event.key === "+") {
      const rows = document.querySelectorAll("tbody tr") as NodeListOf<HTMLTableRowElement>
      this.selection = []
      rows.forEach((row, index) => {
        row.classList.add("!bg-sky-800", "!text-white")
        const customer = this.customers[index]
        if (customer) this.selection.push(customer)
      })
    }

    if (event.key === "-") {
      const rows = document.querySelectorAll("tbody tr") as NodeListOf<HTMLTableRowElement>
      rows.forEach(row => row.classList.remove("!bg-sky-800", "!text-white"))
      this.selection = []
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'a') {
      event.preventDefault()
      const allCells = Array.from(document.querySelectorAll("tbody td")) as HTMLTableCellElement[]

      for (const marked of this.markedCells) {
        marked.classList.remove("bg-amber-500")
      }
      this.markedCells = []

      for (const cell of allCells) {
        cell.classList.add("bg-amber-500")
        this.markedCells.push(cell)
      }

      if (this.markedCells.length > 0) {
        this.lastMarkedCell = this.markedCells[this.markedCells.length - 1]
      }
    }
  }

  toggleMark(event: MouseEvent | KeyboardEvent) {
    const cell = event.target as HTMLTableCellElement
    const allRows = Array.from(document.querySelectorAll("tbody tr")) as HTMLTableRowElement[]
    const currentRow = cell.closest("tr") as HTMLTableRowElement
    const cellIndex = Array.from(currentRow.children).indexOf(cell)

    if (event instanceof MouseEvent && event.shiftKey && this.lastMarkedCell) {
      event.preventDefault()
      document.getSelection()?.removeAllRanges()

      const lastRow = this.lastMarkedCell.closest("tr") as HTMLTableRowElement
      const lastCellIndex = Array.from(lastRow.children).indexOf(this.lastMarkedCell)

      const rowStart = allRows.indexOf(lastRow)
      const rowEnd = allRows.indexOf(currentRow)
      const [fromRow, toRow] = rowStart < rowEnd ? [rowStart, rowEnd] : [rowEnd, rowStart]
      const [fromCol, toCol] = cellIndex < lastCellIndex ? [cellIndex, lastCellIndex] : [lastCellIndex, cellIndex]

      if (!event.ctrlKey) {
        for (const marked of this.markedCells) {
          marked.classList.remove("bg-amber-500")
        }
        this.markedCells = []
      }

      for (let row = fromRow; row <= toRow; row++) {
        for (let col = fromCol; col <= toCol; col++) {
          const target = allRows[row].children[col] as HTMLTableCellElement;
          if (!this.markedCells.includes(target)) {
            target.classList.add("bg-amber-500")
            this.markedCells.push(target)
          }
        }
      }
      return;
    }

    if (!(event instanceof KeyboardEvent) && !event.ctrlKey) {
      for (const marked of this.markedCells) {
        marked.classList.remove("bg-amber-500")
      }
      this.markedCells = []
    }

    if (this.markedCells.includes(cell)) {
      cell.classList.remove("bg-amber-500")
      this.markedCells = this.markedCells.filter(c => c !== cell)
    } else {
      cell.classList.add("bg-amber-500")
      this.markedCells.push(cell)
    }

    this.lastMarkedCell = cell
  }

  moveMarkedCell(direction: string) {
    if (!this.lastMarkedCell) return

    const allRows = Array.from(document.querySelectorAll("tbody tr")) as HTMLTableRowElement[]
    const currentRow = this.lastMarkedCell.closest("tr") as HTMLTableRowElement
    const cellIndex = Array.from(currentRow.children).indexOf(this.lastMarkedCell)
    let newRowIdx = allRows.indexOf(currentRow)
    let newColIdx = cellIndex

    if (direction === "ArrowUp" && newRowIdx > 0) newRowIdx--
    if (direction === "ArrowDown" && newRowIdx < allRows.length - 1) newRowIdx++
    if (direction === "ArrowLeft" && newColIdx > 0) newColIdx--
    if (direction === "ArrowRight" && newColIdx < currentRow.children.length - 1) newColIdx++

    const newCell = allRows[newRowIdx].children[newColIdx] as HTMLTableCellElement
    if (newCell) {
      const mockMouseEvent = {
        target: newCell,
        shiftKey: false,
        ctrlKey: false,
        preventDefault: () => {},
        stopPropagation: () => {}
      } as unknown as MouseEvent

      this.toggleMark(mockMouseEvent)
    }
  }

  markAllCells() {
    // Alte Markierungen entfernen
    for (const cell of this.markedCells) {
      cell.classList.remove('bg-amber-500')
    }
    this.markedCells = []
  
    // Alle Zellen im tbody markieren
    const allCells = Array.from(document.querySelectorAll("tbody td")) as HTMLTableCellElement[]
    for (const cell of allCells) {
      cell.classList.add("bg-amber-500")
      this.markedCells.push(cell)
    }
  
    if (this.markedCells.length > 0) {
      this.lastMarkedCell = this.markedCells[this.markedCells.length - 1]
    }
  }
}