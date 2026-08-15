import { expect, test } from '@wordpress/e2e-test-utils-playwright';

const BLOCK = '[data-type="kevinbatdorf/animate-in-view"]';

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
	// Trunk iframes the canvas, stable does not, so editor.canvas alone misses one
	const iframed = (await page.locator('[name="editor-canvas"]').count()) > 0;
	const block = iframed ? editor.canvas.locator(BLOCK) : page.locator(BLOCK);
	await expect(block).toBeVisible();
});
