import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { cloneBlock, createBlock } from '@wordpress/blocks';
import { ToolbarButton } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import blockConfig from '../block.json';
import { blockIcon } from '../icons';

export const ToolbarMenu = (
	CurrentMenuItems: React.ComponentType,
	props: any,
) => {
	const { clientId } = props;
	const { getBlock, getBlockParents, getBlockName } = useSelect((select) =>
		select(blockEditorStore),
	);
	const { replaceBlock } = useDispatch(blockEditorStore);

	const handleClick = () => {
		const block = getBlock(clientId);
		if (!block) return;
		// Cloning will prevent recursion issues
		const current = cloneBlock(block);
		const wrapped = createBlock(blockConfig.name, {}, [current]);
		if (!wrapped) return;
		replaceBlock(clientId, [wrapped]);
	};

	// If the parent is already an animate in view block, don't show
	const parents = getBlockParents(clientId);
	const parentId = parents.at(-1);
	if (
		(parentId && getBlockName(parentId) === blockConfig.name) ||
		// Also don't show if the current block is ours
		getBlockName(clientId) === blockConfig.name
	) {
		return <CurrentMenuItems {...props} />;
	}
	return (
		<>
			<CurrentMenuItems {...props} />
			<BlockControls>
				<ToolbarButton
					showTooltip
					onClick={handleClick}
					label={__('Animate this block', 'animate-in-view')}
					icon={blockIcon}
				/>
			</BlockControls>
		</>
	);
};
