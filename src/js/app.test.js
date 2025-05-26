import { Widget } from "./widget";

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
  describe("getCardType", () => {
    it("should correctly identify card types", () => {
      const testCases = [
        { number: "4111 1111 1111 1111", expected: "visa" },
        { number: "5555 5555 5555 4444", expected: "mastercard" },
        { number: "2221 2345 6789 0123", expected: "mastercard" },
        { number: "2200 0000 0000 0004", expected: "mir" },
        { number: "1234 5678 9012 3456", expected: "unknown" },
      ];

      testCases.forEach(({ number, expected }) => {
        expect(widget.getCardType(number)).toBe(expected);
      });
    });
  });
  describe("validateCard", () => {
    it("should return correct validation results", () => {
      const testCases = [
        {
          number: "4111 1111 1111 1111",
          expected: {
            isValid: true,
            type: "visa",
            message: "Номер карты валиден (visa)",
          },
        },
        {
          number: "5555 5555 5555 4444",
          expected: {
            isValid: true,
            type: "mastercard",
            message: "Номер карты валиден (mastercard)",
          },
        },
        {
          number: "2200 0000 0000 0004",
          expected: {
            isValid: true,
            type: "mir",
            message: "Номер карты валиден (mir)",
          },
        },
        {
          number: "4111 1111 1111 1112",
          expected: {
            isValid: false,
            type: "unknown",
            message: "Номер карты невалиден",
          },
        },
      ];

      testCases.forEach(({ number, expected }) => {
        const result = widget.validateCard(number);
        expect(result.isValid).toBe(expected.isValid);
        expect(result.type).toBe(expected.type);
        expect(result.message).toBe(expected.message);
      });
    });
  });

});
