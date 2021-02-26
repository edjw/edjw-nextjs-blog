export default {
    backend: {
        name: "git-gateway",
        branch: "master",
        commit_messages: {
            create: `Create {{collection}} {{slug}}`,
            update: "Update {{collection}} {{slug}}",
            delete: "Delete {{collection}} {{slug}}",
            uploadMedia: "Upload {{path}}",
            deleteMedia: "Delete {{path}}"
        }
    },
    media_folder: "/assets/images",
    collections: [
        {
            name: "blog",
            label: "Post",
            folder: "src/posts",
            create: true,
            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
            fields: [
                {
                    label: "Title",
                    name: "title",
                    widget: "string"
                },
                {
                    label: "Publish Date",
                    name: "date",
                    widget: "datetime"
                },
                {
                    label: "Social Description",
                    name: "socialDescription",
                    widget: "string",
                    pattern: [
                        ".{0,155}",
                        "Maximum of 155 characters"
                    ],
                    default: "Ed Johnson-Williams' blog"
                },
                {
                    label: "Tags",
                    name: "tags",
                    widget: "list",
                    field: {
                        label: "Tag",
                        name: "tag",
                        widget: "string"
                    }
                },
                {
                    label: "Body",
                    name: "body",
                    widget: "markdown"
                }
            ]
        },
        {
            name: "pages",
            label: "Page",
            folder: "src/pages",
            create: false,
            slug: "{{slug}}",
            fields: [
                {
                    label: "Title",
                    name: "title",
                    widget: "string"
                },
                {
                    label: "Layout",
                    name: "layout",
                    widget: "string"
                },
                {
                    label: "Permalink",
                    name: "permalink",
                    widget: "string"
                },
                {
                    label: "Social Description",
                    name: "socialDescription",
                    widget: "string",
                    pattern: [
                        ".{0,155}",
                        "Maximum of 155 characters"
                    ],
                    default: "Ed Johnson-Williams' blog"
                },
                {
                    label: "Body",
                    name: "body",
                    widget: "markdown"
                }
            ]
        }
    ]
}