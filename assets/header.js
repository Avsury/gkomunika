  async function updateCartCount() {
    try {
      const res = await fetch('/cart.js');
      if (!res.ok) throw new Error('Failed to load cart data');

      const { item_count } = await res.json();
      const countEl = document.getElementById('cart-count');

      if (item_count > 0) {
        countEl.textContent = item_count;
        countEl.style.display = 'flex';
      } else {
        countEl.style.display = 'none';
      }
    } catch (err) {
      console.error('Error updating cart count:', err);
    }
  }

  document.addEventListener('submit', async (e) => {
    if (e.target.matches('form[action^="/cart/add"]')) {
      e.preventDefault();
      const formData = new FormData(e.target);

      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) throw new Error('Failed to add product to cart');

        await updateCartCount();
      } catch (err) {
        console.error('Error adding product to cart:', err);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Optional: remove MutationObserver if interval is enough
    const observer = new MutationObserver(updateCartCount);
    observer.observe(document.body, { childList: true, subtree: true });

    setInterval(updateCartCount, 3000);
  });

  function toggleMenu() {
    const sidebar = document.getElementById('sidebar-menu');
    const icon = document.getElementById('menu-icon');
    sidebar.classList.toggle('active');
    icon.classList.toggle('open');
  }