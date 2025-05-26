/**
 * @jest-environment jsdom
 */
import { Widget } from "./widget";

describe("Test UI", () => {
  let widget;

  beforeEach(() => {
    // Создаем контейнер для тестов
    document.body.innerHTML = '<div id="container"></div>';
    widget = new Widget();
  });

  it("should handle button click and update UI", () => {
    const paymentList = ["visa", "mastercard", "mir"];
    const widgetElement = widget.appendVidget(paymentList);
    document.getElementById("container").appendChild(widgetElement);

    const input = document.querySelector("input");
    const button = document.querySelector("button");

    // Симулируем ввод валидного номера Visa
    input.value = "4111 1111 1111 1111";

    // Создаём и триггерим событие click
    const clickEvent = new Event("click", { bubbles: true });
    button.dispatchEvent(clickEvent);

    // Проверяем классы
    const visaBadge = document.querySelector(".payment-system.visa");
    const mastercardBadge = document.querySelector(
      ".payment-system.mastercard",
    );
    const mirBadge = document.querySelector(".payment-system.mir");

    expect(visaBadge.classList.contains("gray")).toBe(false);
    expect(mastercardBadge.classList.contains("gray")).toBe(true);
    expect(mirBadge.classList.contains("gray")).toBe(true);
  });
});
