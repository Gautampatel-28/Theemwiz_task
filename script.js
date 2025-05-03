function toggleNavbarMenu() {
    const menu = document.getElementById("navbarMenu")
    menu.classList.toggle('show');
}


const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item'); // safer than parentElement
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

    if (!isActive) item.classList.add('active');
  });
});
