import {
    InnerBlocks,
    useBlockProps as blockProps,
} from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import { addFilter } from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'
import blockConfig from './block.json'
import { Controls } from './editor/Controls'
import { ToolbarMenu } from './editor/ToolbarMenu'
import './front/style.css'
import { blockIcon } from './icons'

export type Attributes = {
    animatein: string
    enabled: 1 | 0
    once: 1 | 0
    direction: 1 | -1 | 0
    threshold: number
    timing: number
    offset: string
}

registerBlockType<Attributes>(blockConfig.name, {
    ...blockConfig,
    icon: blockIcon,
    // These attributes are duplicated here for TypeScript types (DefinitelyTyped)
    // Which seemingly isn't up to date with the Gutenberg Block schema.
    // Not 100% sure.
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
            default: 1,
        },
        direction: {
            type: 'number',
            default: 1,
        },
        threshold: {
            type: 'number',
            default: 1.0,
        },
        timing: {
            type: 'number',
            default: 1.0,
        },
        offset: {
            type: 'string',
            default: '2rem',
        },
    },
    title: __('Animate In View', 'animate-in-view'),
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

// Let other blocks wrap themselves with this block.
addFilter(
    'editor.BlockEdit',
    blockConfig.name,
    // Gutenberg seems to require this to be a function.
    (CurrentMenuItems) => (props: any) => ToolbarMenu(CurrentMenuItems, props),
)
