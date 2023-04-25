import { test, expect } from '@playwright/test';
import { Eyes, Target } from '@applitools/eyes-playwright';


const eyes = new Eyes();

// Set your Applitools API key
eyes.setApiKey("RissvAEsfQ2Y5g2LrXK0yd104aZKaiccVOIkHtRZS18Q4110");

/*
if (process.env.APPLITE_API_KEY) {
  eyes.setApiKey(process.env.APPLITE_API_KEY);
} else {
  console.error('APPLITE_API_KEY environment variable is not defined.');
}*/

// kymmenen uutiset
test('kymmenen uutiset', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv');
  await page.getByRole('link', { name: 'TV-opas' }).click();
  await expect(page.getByText('Kymmenen uutiset')).toBeVisible;
  await expect(page.getByText(/22.00 Kymmenen uutiset/g)).toBeVisible;

  // Start visual testing with Applitools Eyes
  await eyes.open(page, 'kymmenen uutiset', 'TV-opas page');
  await eyes.check('TV-opas page', Target.window().fully());
  await eyes.close();
})

// virheellinen sähköpostin muoto
test('virheellinen sähköpostin muoto', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv')
  await page.waitForLoadState('domcontentloaded')
  await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click()
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('button', { name: 'Luo Yle Tunnus' })
    .click()
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel('Sähköposti')
    .fill('username')
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel('Sähköposti')
    .press('Tab')
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel('Salasana', { exact: true })
    .fill('password')
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('combobox', { name: 'Kuukausi' })
    .selectOption('8')
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('combobox', { name: 'Vuosi' })
    .selectOption('2001')
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('combobox', { name: 'Sukupuoli (valinnainen)' })
    .selectOption('MALE')
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('checkbox', {
      name: 'Hyväksyn Yle Tunnuksen käyttöehdot ja olen tutustunut Ylen tietosuojalausekkeeseen.',
    })
    .check()
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('button', { name: 'Luo Tunnus' })
    .press('Enter')

  await expect(
    page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByRole('alert')
  ).toHaveText(/Tarkista sähköpostiosoitteen muoto./g)
})

// kummeli
test('kummeli k3j5', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv')
  await page.getByPlaceholder('Hae').click()
  await page.getByPlaceholder('Hae').fill('kummel')
  await page.getByPlaceholder('Hae').press('i')
  await page.getByRole('link', { name: 'Kummeli Kummeli', exact: true }).click()

  await page.waitForLoadState('domcontentloaded')
  await page.getByRole('button', { name: 'Kausi 3' }).click()

  await page.waitForLoadState('domcontentloaded')
  await page.getByRole('link', { name: '5. Kummeli' }).click()

  await expect(page).toHaveTitle(/K3, J5: Kummeli/g)
  await expect(page.locator('time[datetime="2006-01-10T20:00:32+02:00"]')).toHaveText(/10.1.2006/g)
})

// proper channel labels
test('labeling', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv')
  await page.getByRole('link', { name: 'TV-opas' }).click()
  const logos = await page.$$('.channel-header__logo')
  for (const logo of logos) {
    const ariaLabel = await logo.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy() // Assert that aria-label contains a non-empty string
  }
})
