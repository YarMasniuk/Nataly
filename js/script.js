window.onload = function () {
  const swiper = new Swiper(".swiper", {
    loop: true, // Зациклення слайдів
    autoplay: {
      delay: 20000, // Затримка між зміною зображень
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    speed: 2000,
    keyboard: {
      enabled: true,
      onliyInViewport: true,
      pegeUpDown: true,
    },
    autoHeight: true,
  });
};

// Знаходимо елементи
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
const navItems = document.querySelectorAll(".nav__item");

// Додаємо обробник події для бургера
burger.addEventListener("click", () => {
  // Додаємо/знімаємо клас open з бургера та навігації
  burger.classList.toggle("open");
  nav.classList.toggle("open");
});

// Додаємо обробник подій для пунктів меню
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Закриваємо меню після кліку на пункт
    burger.classList.remove("open");
    nav.classList.remove("open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".about-me__toggle-btn");
  const textBlock = document.querySelector(".about-me__text-block");

  if (toggleButton && textBlock) {
    toggleButton.addEventListener("click", () => {
      // Додаємо або видаляємо клас 'open' для текстового блоку
      textBlock.classList.toggle("open");

      // Змінюємо текст кнопки
      if (textBlock.classList.contains("open")) {
        toggleButton.textContent = "Hide...";
      } else {
        toggleButton.textContent = "Показати ще...";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", sendToTelegram);
});

function sendToTelegram(event) {
  console.log("Кнопка натиснута");
  // Отримуємо елементи
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const phoneInput = document.getElementById("phone");
  const telegramInput = document.getElementById("telegram");

  // Перевірка на наявність елементів
  if (!nameInput || !surnameInput || !phoneInput || !telegramInput) {
    console.error("Один або більше елементів не знайдені!");
    return;
  }

  // Отримуємо значення інпутів
  const name = nameInput.value;
  const surname = surnameInput.value;
  const phone = phoneInput.value;
  const telegramUsername = telegramInput.value;

  let isValid = true;

  // Валідація полів
  if (!name) {
    nameInput.style.borderColor = "#800000"; // Бордовий колір
    isValid = false;
  }
  if (!surname) {
    surnameInput.style.borderColor = "#800000"; // Бордовий колір
    isValid = false;
  }

  // Валідація телефону: лише цифри і довжина рівно 10 символів
  if (!phone || !/^\d{10}$/.test(phone)) {
    phoneInput.style.borderColor = "#800000"; // Бордовий колір
    isValid = false;
  }

  if (!telegramUsername) {
    telegramInput.style.borderColor = "#800000"; // Бордовий колір
    isValid = false;
  }

  if (!isValid) {
    console.log("Будь ласка, заповніть всі поля коректно!");
    return; // Не відправляємо, якщо валідація не пройдена
  }

  // Перевірка на правильність номера телефону (мінімум 10 цифр)
  // Перевірка на порожні поля
  if (!name || !surname || !phone || !telegramUsername) {
    if (!name) nameInput.classList.add("invalid");
    if (!surname) surnameInput.classList.add("invalid");
    if (!phone) phoneInput.classList.add("invalid");
    if (!telegramUsername) telegramInput.classList.add("invalid");
    return; // Перериваємо відправку, якщо є незаповнені поля
  }
  if (phone.length < 10) {
    phoneInput.classList.add("invalid");
    phoneInput.focus();
    alert("Номер телефону повинен містити мінімум 10 цифр.");
    return;
  } else {
    phoneInput.classList.remove("invalid");
  }

  // Формуємо повідомлення для Telegram
  const message = `Новий запит:
      Ім'я: ${name}
      Призвище: ${surname}
      Телефон: ${phone}
      Username в Telegram: ${telegramUsername}
    `;

  // Ваш токен та chat_id
  const token = "7851484420:AAFDb24FOvhOOj7Dat9Z9d7xu5vczO9586E";
  const chatId = "-4665575999";

  // URL для відправки запиту
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    message
  )}`;

  // Виконання запиту
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        // Зміна тексту на кнопці
        const button = document.querySelector(".footer__button");
        button.textContent = "Успішно відправлено"; // Текст після успішного відправлення
        button.disabled = true; // Деактивуємо кнопку, щоб користувач не міг натискати її знову
        button.classList.add("sent");
      } else {
        console.error("Помилка при відправці:", data);
      }
    })
    .catch((error) => {
      console.error("Помилка з'єднання:", error);
    });
}

// Обмеження на введення тільки цифр у полі телефону
document.getElementById("phone").addEventListener("input", function (event) {
  // Залишаємо лише цифри
  this.value = this.value.replace(/\D/g, "");
});

// Додаємо подію для скидання червоної обводки при фокусі
document.getElementById("name").addEventListener("focus", function () {
  this.style.borderColor = "";
});
document.getElementById("surname").addEventListener("focus", function () {
  this.style.borderColor = "";
});
document.getElementById("phone").addEventListener("focus", function () {
  this.style.borderColor = "";
});
document.getElementById("telegram").addEventListener("focus", function () {
  this.style.borderColor = "";
});

// Додаємо подію для скидання червоної обводки при фокусі
document.getElementById("name").addEventListener("focus", function () {
  this.style.borderColor = "";
});
document.getElementById("surname").addEventListener("focus", function () {
  this.style.borderColor = "";
});
document.getElementById("phone").addEventListener("focus", function () {
  this.style.borderColor = "";
});
document.getElementById("telegram").addEventListener("focus", function () {
  this.style.borderColor = "";
});

// Знаходимо заголовок
const title = document.querySelector(".home__title");

// Розділяємо текст на окремі букви і створюємо з них <span>
title.innerHTML = title.textContent
  .split("")
  .map((letter) => `<span class="letter">${letter}</span>`)
  .join("");

gsap.from(".fade-img", {
  opacity: 0,
  x: 150, // Текст буде трохи нижче
  duration: 2.5, // Тривалість анімації
  ease: "power2.out",
  stagger: 0.2, // Затримка між елементами
});

gsap.from(".fade-in", {
  opacity: 0,
  y: 50, // Текст буде трохи нижче
  duration: 1.5, // Тривалість анімації
  ease: "power2.out",
  stagger: 0.3, // Затримка між елементами
  delay: 2,
});
gsap.from(".fade-on", {
  opacity: 0,
  y: -50, // Текст буде трохи нижче
  duration: 1.5, // Тривалість анімації
  ease: "power2.out",
  stagger: 0.3, // Затримка між елементами
  delay: 2,
});
gsap.from(".fade-or", {
  opacity: 0,
  x: -50, // Текст буде трохи нижче
  duration: 1.5, // Тривалість анімації
  ease: "power2.out",
  stagger: 0.3, // Затримка між елементами
  delay: 2,
});

gsap.from(".fade-decore", {
  opacity: 0,
  scale: 0.5, // Текст буде трохи нижче
  duration: 2.5, // Тривалість анімації
  ease: "power2.out",
  stagger: 0.3, // Затримка між елементами
  delay: 4,
});

gsap.from(".fade-deco", {
  opacity: 0,
  x: -50, // Текст буде трохи нижче
  duration: 2.5, // Тривалість анімації
  ease: "power2.out",
  stagger: 0.3, // Затримка між елементами
  delay: 6,
});

// Використовуємо GSAP для анімації кожної букви
gsap.from(".letter", {
  opacity: 0,
  y: 50, // Початково буква зсувається вниз
  duration: 1, // Тривалість анімації кожної букви
  stagger: 0.1, // Затримка між анімацією кожної букви
  ease: "power2.out", // Плавна анімація
});

// Реєстрація плагіну ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
//Анімація для фото (виїжджає зліва)
gsap.from(".about-me__foto", {
  opacity: 0,
  x: -200, // Початкове зміщення зліва
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".about-me", // Тригер для блоку
    start: "top 90%", // Початок анімації, коли 90% блоку у видимості
    end: "top 10%", // Кінець анімації, коли 30% блоку досягли верхньої частини екрана
    scrub: 5, // Плавність прокрутки
    once: true, // Анімація працюватиме щоразу при прокрутці
  },
});

// Анімація для тексту (знизу вгору)
gsap.from(".about-me__text", {
  opacity: 0,
  x: 150, // Початкове зміщення знизу
  duration: 2,
  ease: "power2.out",
  stagger: 0.5, // Затримка між абзацами
  scrollTrigger: {
    trigger: ".about-me", // Тригер для блоку з текстом
    start: "top 90%", // Початок анімації, коли 75% блоку у видимості
    end: "top 10%", // Кінець анімації, коли 30% блоку у верхній частині екрана
    scrub: 6, // Плавність прокрутки
    once: true, // Анімація працюватиме щоразу при прокрутці
  },
});

// Анімація для заголовка (останній елемент)
gsap.from(".about-me__title", {
  opacity: 0,
  y: -50, // Заголовок виїжджає знизу
  duration: 3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-me",
    start: "top 90%", // Заголовок з'являється трохи пізніше
    end: "top 10%",
    scrub: 7,
    once: true,
  },
});

gsap.from(".blog-img", {
  opacity: 0,
  x: -150, // Початкове зміщення знизу
  duration: 1.5,
  ease: "power2.out",
  stagger: 0.5, // Затримка між абзацами
  scrollTrigger: {
    trigger: ".blog", // Тригер для блоку з текстом
    start: "top 90%", // Початок анімації, коли 75% блоку у видимості
    end: "top 10%", // Кінець анімації, коли 30% блоку у верхній частині екрана
    scrub: 5, // Плавність прокрутки
    once: true, // Анімація працюватиме щоразу при прокрутці
  },
});

gsap.from(".blog-right", {
  opacity: 0,
  x: -150, // Початкове зміщення знизу
  duration: 2,
  ease: "power2.out",
  stagger: 0.5, // Затримка між абзацами
  scrollTrigger: {
    trigger: ".blog", // Тригер для блоку з текстом
    start: "top 90%", // Початок анімації, коли 75% блоку у видимості
    end: "top 40%", // Кінець анімації, коли 30% блоку у верхній частині екрана
    scrub: 6, // Плавність прокрутки
    once: true, // Анімація працюватиме щоразу при прокрутці
  },
});

gsap.from(".footer-left", {
  opacity: 0,
  x: -150, // Початкове зміщення знизу
  duration: 2,
  ease: "power2.out",
  stagger: 0.5, // Затримка між абзацами
  scrollTrigger: {
    trigger: ".footer", // Тригер для блоку з текстом
    start: "top 95%", // Початок анімації, коли 75% блоку у видимості
    end: "top 70%", // Кінець анімації, коли 30% блоку у верхній частині екрана
    scrub: 6, // Плавність прокрутки
    once: true, // Анімація працюватиме щоразу при прокрутці
  },
});

gsap.from(".footer-bottom", {
  opacity: 0,
  y: -50, // Початкове зміщення знизу
  duration: 1.5,
  ease: "power2.out",
  stagger: 0.5, // Затримка між абзацами
  scrollTrigger: {
    trigger: ".footer", // Тригер для блоку з текстом
    start: "top 95%", // Початок анімації, коли 75% блоку у видимості
    end: "top 70%",
    // Кінець анімації, коли 30% блоку у верхній частині екрана
    scrub: 4, // Плавність прокрутки
    once: true, // Анімація працюватиме щоразу при прокрутці
  },
});
// Анімація для кнопки .home__button

// const header = document.querySelector(".header"); // Шапка
// const darkSection = document.querySelector(".dark-section"); // Темна секція
// function checkHeaderPosition() {
//   const rect = darkSection.getBoundingClientRect(); // Отримуємо розмір і позицію елемента
//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight; // Висота вікна браузера

//   // Перевіряємо, чи елемент на екрані
//   if (
//     rect.top >= 0 && // Верх елемента повністю або частково видимий
//     rect.left >= 0 && // Лівий край елемента в межах екрана
//     rect.bottom <= windowHeight && // Нижній край елемента не виходить за межі екрана
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth) // Правий край елемента не виходить за межі екрана
//   ) {
//     console.log("dark");
//     header.classList.add("header--dark");
//     header.classList.remove("header--light");
//   } else {
//     console.log("light");
//     header.classList.add("header--light");
//     header.classList.remove("header--dark");
//   }
// }

// // Викликаємо функцію при прокручуванні сторінки
// window.addEventListener("scroll", checkHeaderPosition);

// // Викликаємо функцію одразу після завантаження сторінки
// checkHeaderPosition();
