import {
    InnerBlocks,
    useBlockProps as blockProps,
} from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
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
