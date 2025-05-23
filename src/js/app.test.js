import { Widget } from "./widget"; // Путь к вашему файлу с классом Widget

describe("Widget", () => {
  let widget;

  beforeEach(() => {
    widget = new Widget({});
  });

  describe("isValidCardNumber", () => {
    it("Валидная карта", () => {
      const validCards = [
        "4111 1111 1111 1111", // Visa
        "5555 5555 5555 4444", // Mastercard
        "2200 0000 0000 0004", // Mir
      ];

      validCards.forEach((card) => {
        expect(widget.isValidCardNumber(card)).toBe(true);
      });
    });

    it("Не валидная карта", () => {
      const invalidCards = [
        "4111 1111 1111 1112",
        "5555 5555 5555 5555",
        "1234 5678 9012 3456",
        "123",
        "1234 5678 9012 3456 7890",
        "abcdef ghijkl mnopqr",
      ];

      invalidCards.forEach((card) => {
        expect(widget.isValidCardNumber(card)).toBe(false);
      });
    });
  });
});


