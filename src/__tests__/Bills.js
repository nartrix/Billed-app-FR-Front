/**
 * @jest-environment jsdom
 */

import {fireEvent, screen, waitFor} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store";
import Bills  from '../containers/Bills.js';

import router from "../app/Router.js";

jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      //to-do write expect expression
      expect(windowIcon.classList).toContain("active-icon")
    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })

  describe("When I request getBills()", () => {
    describe("When an error occurs on API", () => {
      beforeEach(() => {
        jest.spyOn(mockStore, "bills")
        Object.defineProperty(
            window,
            'localStorage',
            { value: localStorageMock }
        )
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee',
          email: "a@a"
        }))
        const root = document.createElement("div")
        root.setAttribute("id", "root")
        document.body.appendChild(root)
        router()
      })
      test("fetches bills from an API and fails with 404 message error", async () => {
  
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list : () =>  {
              return Promise.reject(new Error("Erreur 404"))
            }
          }})
        window.onNavigate(ROUTES_PATH.Bills)
        await new Promise(process.nextTick);
        const message = await screen.getByText(/Erreur 404/)
        expect(message).toBeTruthy()
      })
  
      test("fetches messages from an API and fails with 500 message error", async () => {
  
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list : () =>  {
              return Promise.reject(new Error("Erreur 500"))
            }
          }})
  
        window.onNavigate(ROUTES_PATH.Bills)
        await new Promise(process.nextTick);
        const message = await screen.getByText(/Erreur 500/)
        expect(message).toBeTruthy()
      })
    })
  })

  describe("when i click on icon eye", () => {
    test('should open the modal and display the bill image', () => {
      /* document.body.innerHTML = `<div id="modaleFile">
                                     <div class="modal-body"></div>
                                   </div>`;
      const iconMock = document.createElement("i");
      iconMock.setAttribute("data-bill-url", "https://example.com/bill.png"); */

      /* // Créer un mock pour l'élément modaleFile
      const modaleFileMock = document.createElement('div');
      modaleFileMock.id = 'modaleFile';
      const modalBodyMock = document.createElement('div');
      modalBodyMock.className = 'modal-body';
      modaleFileMock.appendChild(modalBodyMock); */

      // Mock de la fonction jQuery $
      /* jest.mock('jquery', () => ({
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
          width: jest.fn(() => 100),
          find: jest.fn().mockImplementation(() => ({
            html: jest.fn(),
          })),
          modal: jest.fn(),
          click: jest.fn(),
        })),
      })); */

      const billsPage = new Bills({
        document,
        onNavigate: jest.fn(),
        store: null,
        localStorage: window.localStorage,
      });

      const handleClickIconEye = jest.fn((e) => billsPage.handleClickIconEye(e.target))
      const eye = screen.getAllByTestId('icon-eye')[0]
      eye.addEventListener('click', handleClickIconEye)
      fireEvent.click(eye)
      expect(handleClickIconEye).toHaveBeenCalled()

      // Call the function to test
     /*  billsPage.handleClickIconEye(iconMock);

      // Check that the modal is displayed
      expect('icon-eye').toHaveBeenCalledWith("show");
 */
      // Check that the html function is called with the correct content
      /* const expectedHtml = '<div style=\'text-align: center;\' class="bill-proof-container"><img width=50 src="https://example.com/bill.png" alt="Bill" /></div>';
      expect(modalBodyMock.innerHTML).toBe(expectedHtml); */
    });
  })
})
