import {
    InspectorAdvancedControls,
    InspectorControls,
} from '@wordpress/block-editor'
import {
    PanelBody,
    BaseControl,
    TextControl,
    Button,
    RangeControl,
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import type { Attributes } from '..'
import './editor.css'
import { ToggleGroupControl, ToggleGroupControlOption } from './exports'

interface ControlProps {
    attributes: Attributes
    setAttributes: (attributes: Attributes) => void
}
type ValueOf<T> = T[keyof T]

export const Controls = ({ attributes, setAttributes }: ControlProps) => {
    const update = (key: keyof Attributes, value: ValueOf<Attributes>) => {
        setAttributes({
            ...attributes,
            [key]: value,
        })
    }
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'animate-in-view')}>
                    <BaseControl id="main-settings">
                        <div className="animate-in-view-editor">
                            <ToggleGroupControl
                                onChange={(value: number) =>
                                    update('enabled', value)
                                }
                                label={__('Enabled', 'animate-in-view')}
                                value={attributes.enabled}
                                isBlock>
                                <ToggleGroupControlOption
                                    value={1}
                                    label={__('Enabled', 'animate-in-view')}
                                />
                                <ToggleGroupControlOption
                                    value={0}
                                    label={__('Disabled', 'animate-in-view')}
                                />
                            </ToggleGroupControl>
                            <RangeControl
                                label={__(
                                    'Visibility threshold',
                                    'animate-in-view',
                                )}
                                help={__(
                                    'Determine how much of the element needs to be in view before the transition begins.',
                                    'animate-in-view',
                                )}
                                step={0.1}
                                min={0.1}
                                max={1}
                                value={attributes.threshold}
                                onChange={(threshold) =>
                                    update('threshold', threshold ?? 0.8)
                                }
                            />
                            <ToggleGroupControl
                                onChange={(value: number) =>
                                    update('direction', value)
                                }
                                label={__(
                                    'Starting position',
                                    'animate-in-view',
                                )}
                                help={__(
                                    "Set this to 'None' to disable the slide animation.",
                                    'animate-in-view',
                                )}
                                value={attributes.direction}
                                isBlock>
                                <ToggleGroupControlOption
                                    value={-1}
                                    label={__('Left', 'animate-in-view')}
                                />
                                <ToggleGroupControlOption
                                    value={0}
                                    label={__('None', 'animate-in-view')}
                                />
                                <ToggleGroupControlOption
                                    value={1}
                                    label={__('Right', 'animate-in-view')}
                                />
                            </ToggleGroupControl>
                            <ToggleGroupControl
                                onChange={(value: number) =>
                                    update('once', value)
                                }
                                help={__(
                                    "Set this to 'Infinite' to reset the animation when the element leaves the screen.",
                                    'animate-in-view',
                                )}
                                // Is there a better word to use here?
                                label={__('Frequency', 'animate-in-view')}
                                value={attributes.once}
                                isBlock>
                                <ToggleGroupControlOption
                                    value={1}
                                    label={__('Once', 'animate-in-view')}
                                />
                                <ToggleGroupControlOption
                                    value={0}
                                    label={__('Infinite', 'animate-in-view')}
                                />
                            </ToggleGroupControl>
                        </div>
                    </BaseControl>
                </PanelBody>
            </InspectorControls>
            <InspectorAdvancedControls>
                <BaseControl id="advanced-settings">
                    <div className="animate-in-view-editor">
                        <TextControl
                            label={__('Animation class', 'animate-in-view')}
                            help={__(
                                'Edit this to use custom animations',
                                'animate-in-view',
                            )}
                            value={attributes.animatein}
                            onChange={(value) => update('animatein', value)}
                        />
                        {/* Show the reset button if they changed the class */}
                        {attributes.animatein === 'animate-in-view' ? null : (
                            <Button
                                variant="link"
                                className="relative -top-4"
                                onClick={() =>
                                    update('animatein', 'animate-in-view')
                                }>
                                {__('Reset', 'animate-in-view')}
                            </Button>
                        )}
                    </div>
                </BaseControl>
            </InspectorAdvancedControls>
        </>
    )
}
