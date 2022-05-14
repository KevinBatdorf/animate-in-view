import {
    BlockControls,
    store as blockEditorStore,
} from '@wordpress/block-editor'
import { createBlock, cloneBlock } from '@wordpress/blocks'
import { ToolbarButton } from '@wordpress/components'
import { useDispatch, useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'
import blockConfig from '../block.json'
import { blockIcon } from '../icons'

export const ToolbarMenu = (
    CurrentMenuItems: React.ComponentType,
    props: any,
) => {
    const { clientId } = props
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - getBlock not added as a type?
    const { getBlock, getBlockParents, getBlockName } = useSelect((select) =>
        select(blockEditorStore),
    )
    // @ts-ignore-next-line - replaceBlock not added as a type?
    const { replaceBlock } = useDispatch(blockEditorStore)

    const handleClick = () => {
        // Cloning will prevent recursion issues
        const current = cloneBlock(getBlock(clientId))
        const wrapped = createBlock(blockConfig.name, {}, [current])
        if (!wrapped) return
        replaceBlock(clientId, [wrapped])
    }

    // If the parent is already an animate in view block, don't show
    const parents = getBlockParents(clientId)
    if (
        (parents?.length > 0 &&
            getBlockName(parents.at(-1)) === blockConfig.name) ||
        // Also don't show if the current block is ours
        getBlockName(clientId) === blockConfig.name
    ) {
        return <CurrentMenuItems {...props} />
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
    )
}
