import * as SimpleMDE from "simplemde";

export let EditorConfig: { spellChecker: boolean; element: Element; status: boolean, toolbar: Array<any> } = {
    spellChecker: false,
    element: null,
    status: false,
    toolbar: [ {
        name: "bold",
        action: SimpleMDE.toggleBold,
        className: "material-icons icon-bold",
        title: "Bold",
    },
    {
        name: "italic",
        action: SimpleMDE.toggleItalic,
        className: "material-icons icon-italic",
        title: "Italic",
    },
    {
        name: "heading",
        action: SimpleMDE.toggleHeadingSmaller,
        className: "material-icons icon-heading",
        title: "Heading",
    },
    {
        name: "strikethrough",
        action: SimpleMDE.toggleStrikethrough,
        className: "material-icons icon-strikethrough",
        title: "Strikethrough",
    },
        "|",
    {
        name: "quote",
        action: SimpleMDE.toggleBlockquote,
        className: "material-icons icon-quote",
        title: "Quote",
    },
    {
        name: "link",
        action: SimpleMDE.drawLink,
        className: "material-icons icon-link",
        title: "Link",
    }]
};

export default EditorConfig;