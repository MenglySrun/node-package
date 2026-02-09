function typeText(text, element, options = {}) {
  const {
    speed = 100,
    loop = false,
    cursor = '|',
    showCursor = true
  } = options;

  let targetElement;
  if (typeof element === 'string') {
    targetElement = document.querySelector(element);
    if (!targetElement) {
      console.error(`Element not found: ${element}`);
      return;
    }
  } else if (element instanceof HTMLElement) {
    targetElement = element;
  } else {
    console.error('Invalid element provided');
    return;
  }

  let currentIndex = 0;
  let isDeleting = false;
  let currentText = '';

  function type() {
    if (!isDeleting && currentIndex < text.length) {
      currentText = text.substring(0, currentIndex + 1);
      currentIndex++;
      targetElement.textContent = currentText + (showCursor ? cursor : '');
      setTimeout(type, speed);
    } else if (isDeleting && currentIndex > 0) {
      currentText = text.substring(0, currentIndex - 1);
      currentIndex--;
      targetElement.textContent = currentText + (showCursor ? cursor : '');
      setTimeout(type, speed / 2);
    } else if (loop && currentIndex === text.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (loop && currentIndex === 0 && isDeleting) {
      isDeleting = false;
      setTimeout(type, 500);
    } else if (!loop && currentIndex === text.length) {
      if (showCursor) {
        setTimeout(() => {
          targetElement.textContent = currentText;
        }, 1000);
      }
    }
  }

  type();
}

function typeTextSimple(text, element, speed = 100) {
  typeText(text, element, { speed, loop: false, showCursor: false });
}

module.exports = {
  typeText,
  typeTextSimple
};