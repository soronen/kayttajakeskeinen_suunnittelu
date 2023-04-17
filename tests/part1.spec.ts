import { test, expect } from '@playwright/test'
//import { injectAxe, checkA11y } from '@axe-core/playwright';

const AxeBuilder = require('@axe-core/playwright').default;
// kymmenen uutiset
test('kymmenen uutiset', async ({ page }) => {

  await page.goto('https://areena.yle.fi/tv')
  await page.getByRole('link', { name: 'TV-opas' }).click()
  await expect(page.getByText('Kymmenen uutiset')).toBeVisible
  await expect(page.getByText(/22.00 Kymmenen uutiset/g)).toBeVisible

  try {
    const results = await new AxeBuilder({ page }).analyze();
    console.log(results);
  } catch (e) {
    // do something with the error
  }
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

  try {
    const results = await new AxeBuilder({ page }).analyze();
    console.log(results);
  } catch (e) {
    // do something with the error
  }
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

  try {
    const results = await new AxeBuilder({ page }).analyze();
    console.log(results);
  } catch (e) {
    // do something with the error
  }
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
