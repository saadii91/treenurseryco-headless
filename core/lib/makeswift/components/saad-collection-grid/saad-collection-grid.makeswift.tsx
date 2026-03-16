import { runtime } from '~/lib/makeswift/runtime';
import { List, Group, Image, TextInput, Link, Style } from '@makeswift/runtime/controls';
import { CollectionGrid } from '~/components/saad-collection-grid';


runtime.registerComponent(CollectionGrid, {
  type: 'collection-grid',
  label: 'BigCommerce / Collection Grid',
  props: {
    className: Style(),
    collections: List({
      label: 'Collections',
      type: Group({
        label: 'Collection Item',
        props: {

          image: Image({
            label: 'Image'
          }),
          name: TextInput({
            label: 'Name',
            defaultValue: 'New Collection'
          }),
          link: Link({
            label: 'Link'
          }),
        },
      }),
      getItemLabel: (item) => item?.name || 'Collection Item',
    }),
  },
});