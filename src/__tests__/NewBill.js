/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion

      const form = document.querySelector(`form[data-testid="form-new-bill"]`);
      const fileInput = document.querySelector(`input[data-testid="file"]`);
      const expenseTypeSelect = document.querySelector(`select[data-testid="expense-type"]`);
      const expenseNameInput = document.querySelector(`input[data-testid="expense-name"]`);
      const amountInput = document.querySelector(`input[data-testid="amount"]`);
      const datepickerInput = document.querySelector(`input[data-testid="datepicker"]`);
      const vatInput = document.querySelector(`input[data-testid="vat"]`);
      const pctInput = document.querySelector(`input[data-testid="pct"]`);
      const commentaryTextarea = document.querySelector(`textarea[data-testid="commentary"]`);

      expect(form).toBeTruthy();
      expect(fileInput).toBeTruthy();
      expect(expenseTypeSelect).toBeTruthy();
      expect(expenseNameInput).toBeTruthy();
      expect(amountInput).toBeTruthy();
      expect(datepickerInput).toBeTruthy();
      expect(vatInput).toBeTruthy();
      expect(pctInput).toBeTruthy();
      expect(commentaryTextarea).toBeTruthy();
    })
  })
})
