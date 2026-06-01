const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const text = card.dataset.search.toLowerCase();

    if (text.includes(searchTerm)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
});