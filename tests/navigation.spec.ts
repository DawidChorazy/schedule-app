const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Symulacja kliknięcia na link z tekstem "Zaloguj się", przejście do strony logowania
  await page.locator('a[href="/login"]').first().click();
  // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
  await expect(page).toHaveURL('http://localhost:3000/login');
  // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem "Zaloguj się"
  await expect(page.locator('h1')).toContainText('Zaloguj się');
});

test('login process with invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  // Wypełnienie formularza logowania nieprawidłowymi danymi
  await page.getByLabel('Email').fill('invalid@example.com');
  await page.getByLabel('Hasło').fill('wrongpassword');
  // Kliknięcie przycisku logowania
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  // Sprawdzenie, czy strona pozostaje na /login (brak przekierowania przy błędnych danych)
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('redirects unauthenticated users to login', async ({ page }) => {
  await page.goto('http://localhost:3000/schedule');
  // Sprawdzenie, czy niezalogowany użytkownik zostaje przekierowany do /login
  await expect(page).toHaveURL('http://localhost:3000/login');
});