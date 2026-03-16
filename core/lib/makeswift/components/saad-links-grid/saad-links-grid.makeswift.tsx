import { runtime } from '~/lib/makeswift/runtime';
import { List, Group, Image, TextInput, Link, Style } from '@makeswift/runtime/controls';
import { CtaGrid } from '~/components/saad-links-grid';

runtime.registerComponent(CtaGrid, {
    type: 'cta-grid',
    label: 'Custom CTA Grid',
    props: {
        className: Style(),
        boxes: List({
            label: 'CTA Boxes',
            // Group is the key here to handle the nested image/name/link data
            type: Group({
                label: 'CTA Item',
                props: {
                    image: Image({
                        label: 'Image'
                    }),
                    name: TextInput({
                        label: 'Name',
                        defaultValue: 'New CTA'
                    }),
                    link: Link({
                        label: 'Link'
                    }),
                },
            }),
            getItemLabel: (item) => item?.name || 'CTA Item',
        }),
    },
});