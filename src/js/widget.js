export class Widget {
  constructor(card, pymentList) {
    this.card = card;

  }
  appendVidget(pymentList) {
    const widget = document.createElement("div");
    console.log(pymentList)
    pymentList.forEach((el) => console.log(el));
    const btn = document.createElement("button");
    btn.textContent = "Проверить";
    btn.classList.add("btn");

    const inp = document.createElement("input");
    inp.placeholder = "Введите номер карты";

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const result = this.validateCard(inp.value);
      const pays = document.querySelector(`.${result.type}`);
      if (pays !== null) {
        const qspay = document.querySelectorAll(".payment-system");
        qspay.forEach((value, key, parent) => {
          if (value.classList.length < 3) {
            value.classList.add("gray");
          }
        });
        pays.classList.remove("gray");
      }
    });

    widget.append(btn, inp);
    return widget;
  }

  isValidCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\D/g, "");
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < cleanNumber.length; i++) {
      let digit = parseInt(cleanNumber.charAt(i), 10);

      if ((cleanNumber.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  getCardType(cardNumber) {
    const cleanNumber = cardNumber.replace(/\D/g, "");

    if (/^4/.test(cleanNumber)) {
      return "visa";
    }

    if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
      return "mastercard";
    }

    if (/^220[0-4]/.test(cleanNumber)) {
      return "mir";
    }

    return "unknown";
  }

  validateCard(cardNumber) {
    const isValid = this.isValidCardNumber(cardNumber);
    const type = isValid ? this.getCardType(cardNumber) : "unknown";

    return {
      isValid: isValid,
      type: type,
      message: isValid
        ? `Номер карты валиден (${type})`
        : "Номер карты невалиден",
    };
  }
}
