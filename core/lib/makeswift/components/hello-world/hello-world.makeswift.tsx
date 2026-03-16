// import { TextInput } from "@makeswift/runtime/controls"
// import { runtime } from "~/lib/makeswift/runtime";
// import { HelloWorld } from "~/components/hello-world";

// runtime.registerComponent(HelloWorld, {
//     type: "hello-world",
//     label: "Basic / Hello World",
//     props: {
//         name: TextInput({
//             label: "Name",
//             defaultValue: "World",
//         }),
//     },
// });


// lib/makeswift/components.tsx
import { runtime } from '~/lib/makeswift/runtime'
import { Number, TextInput } from '@makeswift/runtime/controls'
import { CustomBlogCarousel } from '~/components/hello-world'

runtime.registerComponent(CustomBlogCarousel, {
    type: 'custom-blog-carousel',
    label: 'Custom Blog Carousel',
    props: {
        title: TextInput({ label: 'Title', defaultValue: 'Our Blog' }),
        subtitle: TextInput({ label: 'Subtitle', defaultValue: 'A few of our recent posts' }),
        desktopLimit: Number({
            label: 'Desktop Visible Posts',
            defaultValue: 3,
            min: 1,
            max: 10,
            step: 1,
        }),
        mobileLimit: Number({
            label: 'Mobile Visible Posts',
            defaultValue: 1,
            min: 1,
            max: 5,
            step: 1,
        }),
    },
})