import { expect, test } from '@wordpress/e2e-test-utils-playwright';

test.beforeEach(async ({ requestUtils }) => {
	await requestUtils.login();
});

test('Plugin is active and block is registered', async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost({ title: 'Test post' });
	await editor.insertBlock({ name: 'kevinbatdorf/animate-in-view' });
	await expect(
		page.locator('[data-type="kevinbatdorf/animate-in-view"]'),
	).toBeVisible();
});
