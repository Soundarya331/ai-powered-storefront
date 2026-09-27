import { test, expect } from '@playwright/test';

const product = { id: 1, title: 'Test Headphones', description: 'Wireless audio', category: 'Audio', price_cents: 2500, stock_quantity: 3, image_url: null, is_active: true };

test.beforeEach(async ({ page }) => {
  await page.route('**/api/products?*', route => route.fulfill({ json: [product] }));
  await page.route('**/api/auth/config', route => route.fulfill({ json: { google_client_id: 'test-client' } }));
  await page.route('https://accounts.google.com/gsi/client', route => route.fulfill({
    contentType: 'application/javascript', body: `window.google = { accounts: { id: {
      initialize: function(options) { window.testGoogleLogin = options.callback; },
      renderButton: function(element) { const button = document.createElement('button'); button.textContent = 'Continue with Google'; button.onclick = () => window.testGoogleLogin({ credential: 'test-token' }); element.appendChild(button); },
      disableAutoSelect: function() {}
    } } };`
  }));
  await page.route('**/api/auth/google', route => route.fulfill({ json: { access_token: 'test-session', user: { id: 1, email: 'test@example.com', full_name: 'Test User', role: 'customer', avatar_url: null } } }));
  await page.goto('/');
});

test('quantities, availability and totals stay synchronized across card, details and cart', async ({ page }) => {
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'Increase quantity', exact: true }).click();
  await expect(page.getByText('2 in cart / 1 available to add')).toBeVisible();
  await page.getByText('Test Headphones', { exact: true }).click();
  const details = page.getByRole('dialog', { name: 'Test Headphones' });
  await details.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(details.getByText('3 in cart / 0 available to add')).toBeVisible();
  await expect(details.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
  await details.getByRole('button', { name: 'Decrease quantity' }).click();
  await details.getByRole('button', { name: 'Close product details' }).click();
  await page.getByRole('button', { name: 'Shopping Cart', exact: true }).click();
  const cart = page.getByRole('dialog', { name: 'Shopping cart' });
  await expect(cart.getByText('$50.00').first()).toBeVisible();
  await cart.getByRole('button', { name: 'Decrease Test Headphones quantity' }).click();
  await expect(cart.getByText('2 available to add')).toBeVisible();
  await cart.getByRole('button', { name: 'Close cart' }).click();
  await page.reload();
  await expect(page.getByText('1 in cart / 2 available to add')).toBeVisible();
  await page.getByRole('button', { name: 'Decrease quantity', exact: true }).click();
  await expect(page.getByText('0 in cart / 3 available to add')).toBeVisible();
});

test('guest Buy now prompts Google signup and preserves cart after login', async ({ page }) => {
  await page.getByRole('button', { name: 'Buy now', exact: true }).click();
  const cart = page.getByRole('dialog', { name: 'Shopping cart' });
  await expect(cart.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();
  await cart.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(cart.getByRole('heading', { name: 'Sign in or create an account' })).toBeHidden();
  await expect(cart.getByText('Test Headphones', { exact: true })).toBeVisible();
  await expect(cart.getByRole('button', { name: 'Proceed to Stripe Checkout' })).toBeEnabled();
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`store and overlays fit ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    const noOverflow = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await noOverflow();
    await page.getByRole('button', { name: 'Support', exact: true }).click();
    await noOverflow();
    const chat = page.locator('form').filter({ has: page.getByPlaceholder('Ask about products, prices, or orders...') });
    await expect(chat).toBeVisible();
    await page.getByRole('button', { name: 'Close support' }).click();
    await page.getByRole('button', { name: 'Buy now', exact: true }).click();
    await noOverflow();
    await expect(page.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();
  });
}
