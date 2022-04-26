=== Animate In View – A Gutenberg animation block ===
Contributors:      kbat82
Tags:              animation, animate, in view, slide, fade, intersection, observer, block
Tested up to:      5.9
Stable tag:        1.0.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A dead-simple Gutenberg block to animate in "anything" when the block comes into the user's view.

== Description ==

The Animate In View block add a simple JavaScript watcher over all the inner blocks you add within. When the Animtate In View block comes into view, it will simply fade and optionally slide in.

- Follow [@kevinbatdorf](https://twitter.com/kevinbatdorf) on Twitter
- View on [GitHub](https://github.com/KevinBatdorf/animate-in-block)

= Features =
- Set a threshold for when the block starts to animate
- Run only once, or each time it comes in/out of view
- Wrap any existing block with the Animate In block with the push of a button
- Transition in left, right, or neither (fade only)
- Change the class name used to add your own custom animations

= General Tips & Tricks =
- You can wrap the currently selected block with an Animate In View block by pressing the icon toward the end of the toolbar. It will only show if it's not already the direct child of an Animate In View block.
- You may want to place within group blocks to ensure content styling is consistent. Some themes may reguire a group block be at the top level. Alternatively, the Animate In View block has alignment controls enabled just in case.
- Nest blocks to stagger animations. The animations won't start until all are in view, then one by one.
- The Animate In View block comes with a single nested group block by default, but you may use others as well.
- Use the list view to drag and drop blocks into the Animate In View block.

== Installation ==

1. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= Can you add x feature? =

I'm purposely keeping this lightweight so don't plan on adding features, especially if it means adding bloat to the frontend. But open an issue on the GitHub repo and lets chat about it.

= Why a block and not just extend all blocks? =

This keeps block functionality composable. This block is very lightweight and does the minimum it needs to keep track of the blocks on screen and just animate them in. If you are looking for a fully featured animation suite, this isn't it.

== Screenshots ==

1. Simple, clean, consistent animations.
2. Minimum controls to get the best results

== Changelog ==

= 1.0.1 =
* Initial release
