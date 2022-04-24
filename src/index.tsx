import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps as blockProps } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { TheBlock } from './front/TheBlock'
import { Controls } from './editor/Controls'
import blockConfig from './block.json'

export type Attributes = {
    text: string
}

registerBlockType<Attributes>('kevinbatdorf/animate-in-view', {
    ...blockConfig,
    icon: undefined,
    // Types seem to be mismatched if importing these from block.json
    attributes: {
        text: {
            type: 'string',
            default: 'Loading...',
        },
    },

    title: __('Animate In', 'animate-in-view'),
    edit: ({ attributes, setAttributes }) => (
        <>
            <Controls attributes={attributes} setAttributes={setAttributes} />
            <div {...blockProps()}>
                <TheBlock {...attributes} />
            </div>
        </>
    ),
    save: ({ attributes }) => {
        return (
            <div {...blockProps.save()}>
                <TheBlock {...attributes} />
            </div>
        )
    },
})
