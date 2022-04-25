import {
    InnerBlocks,
    BlockControls,
    useBlockProps as blockProps,
    store as blockEditorStore,
} from '@wordpress/block-editor'
import { createBlock, registerBlockType, cloneBlock } from '@wordpress/blocks'
import type { TransformBlock } from '@wordpress/blocks'
import { ToolbarButton } from '@wordpress/components'
import { useDispatch, useSelect, select } from '@wordpress/data'
import { addFilter } from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'
import blockConfig from './block.json'
import { Controls } from './editor/Controls'
import './front/style.css'
import { blockIcon } from './icons'

export type Attributes = {
    animatein: string
    enabled: 1 | 0
    once: 1 | 0
    direction: 1 | -1 | 0
    threshold: number
}

registerBlockType<Attributes>('kevinbatdorf/animate-in-view', {
    ...blockConfig,
    icon: blockIcon,
    attributes: {
        animatein: {
            type: 'string',
            default: 'animate-in-view',
        },
        enabled: {
            type: 'number',
            default: 1,
        },
        once: {
            type: 'number',
            default: 0,
        },
        direction: {
            type: 'number',
            default: 1,
        },
        threshold: {
            type: 'number',
            default: 1.0,
        },
    },
    title: __('Animate In View', 'animate-in-view'),
    transforms: {
        from: [
            {
                type: 'block',
                blocks: ['*'],
                transform: () => {
                    const { getSelectedBlock } = select('core/block-editor')
                    const currentBlock = getSelectedBlock()
                    console.log({ currentBlock })
                    if (!currentBlock) return
                    // This will just wrap the current block with our block
                    return createBlock('kevinbatdorf/animate-in-view', {}, [
                        // Cloning will prevent recursion issues
                        cloneBlock(currentBlock),
                    ])
                },
            } as TransformBlock<Attributes>,
        ],
    },
    edit: ({ attributes, setAttributes }) => (
        <>
            <Controls attributes={attributes} setAttributes={setAttributes} />
            <div {...blockProps()}>
                <InnerBlocks template={[['core/group', {}]]} />
            </div>
        </>
    ),
    save: ({ attributes }) => {
        return (
            <div {...blockProps.save()} {...attributes}>
                <InnerBlocks.Content />
            </div>
        )
    },
})

// Filter all blocks to let them wrap with the animate block
addFilter(
    'editor.BlockEdit',
    'kevinbatdorf/animate-in-view',
    (BlockEdit) =>
        // TODO: How best to type props here?
        function ToolbarMenu(props: any) {
            const { clientId } = props
            const { getBlock, getBlockParents, getBlockName } =
                useSelect(blockEditorStore)
            // @ts-ignore-next-line - replaceBlock not added as a type?
            const { replaceBlock } = useDispatch(blockEditorStore)

            const handleClick = () => {
                // Cloning will prevent recursion issues
                const current = cloneBlock(getBlock(clientId))
                const wrapped = createBlock(
                    'kevinbatdorf/animate-in-view',
                    {},
                    [current],
                )
                if (!wrapped) return
                replaceBlock(clientId, [wrapped])
            }

            // If the parent is already an animate in view block, don't show
            const parents = getBlockParents(clientId)
            if (
                (parents?.length > 0 &&
                    getBlockName(parents.at(-1)) ===
                        'kevinbatdorf/animate-in-view') ||
                // Also don't show if the current block is ours
                getBlockName(clientId) === 'kevinbatdorf/animate-in-view'
            ) {
                return <BlockEdit {...props} />
            }
            return (
                <>
                    <BlockEdit {...props} />
                    <BlockControls>
                        <ToolbarButton
                            showTooltip
                            onClick={handleClick}
                            label={__('Wrap with Animate In View block')}
                            icon={blockIcon}
                        />
                    </BlockControls>
                </>
            )
        },
)
