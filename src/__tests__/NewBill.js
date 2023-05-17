/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the form elements must present", () => {
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

  // POST integration test
  describe("Integration test - NewBill", () => {
    let newBill;

    beforeEach(() => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      const onNavigate = jest.fn();
      const storeMock = {
        bills: jest.fn().mockReturnValue({
          create: jest.fn(),
          update: jest.fn(),
        }),
      };
      window.localStorage.setItem(
        "user",
        JSON.stringify({ type: "Employee", email: "test@employee.com" })
      );
      newBill = new NewBill({
        document,
        onNavigate,
        store: storeMock,
        localStorage: window.localStorage,
      });
    });

    afterEach(() => {
      window.localStorage.clear();
    });

    test("should submit the form and call updateBill", () => {
      // Fill the required fields
      const expenseTypeSelect = screen.getByTestId("expense-type");
      const expenseNameInput = screen.getByTestId("expense-name");
      const amountInput = screen.getByTestId("amount");
      const datepickerInput = screen.getByTestId("datepicker");

      fireEvent.change(expenseTypeSelect, { target: { value: "Voyage" } });
      fireEvent.change(expenseNameInput, { target: { value: "Test" } });
      fireEvent.change(amountInput, { target: { value: "100" } });
      fireEvent.change(datepickerInput, { target: { value: "2022-06-05" } });

      // Mock the updateBill method
      newBill.updateBill = jest.fn();

      // Submit the form
      const formNewBill = screen.getByTestId("form-new-bill");
      fireEvent.submit(formNewBill);

      // Verify that updateBill method is called
      expect(newBill.updateBill).toHaveBeenCalled();
    });

  });
})
