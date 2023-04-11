import { test, expect } from '@playwright/test';

test('kummeli k3j5', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv')
  await page.locator('html').click();
  await page.getByPlaceholder('Hae').fill('kummeli');
  await page.getByPlaceholder('Hae').click();
  await page.getByPlaceholder('Hae').press('Enter');
  await page.getByRole('link', { name: 'Kummeli Kummeli', exact: true }).click();
  await page.getByRole('button', { name: 'Kausi 3' }).click();
  await page.getByRole('link', { name: '5. Kummeli' }).click();

  await expect(page).toHaveTitle(/K3, J5: Kummeli/g);
  await expect(page.locator('time[datetime="2006-01-10T20:00:32+02:00"]')).toHaveText(/10.1.2006/g);
});