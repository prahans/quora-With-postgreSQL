setTimeout(() => {
    document.querySelectorAll("mark").forEach(el => {
      el.replaceWith(el.innerText);
    });
}, 10000); // 10 seconds
