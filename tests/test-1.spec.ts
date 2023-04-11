import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv');
  await page.getByRole('link', { name: 'TV-opas' }).click();
  await expect(page.getByText('22.00 Kymmenen uutiset 19 min')).isVisible;
  await page.locator('span').filter({ hasText: '22.00 Kymmenen uutiset' }).getByRole('time').first()
  await page.getByText('22.20').click({
    button: 'right'
  });
});