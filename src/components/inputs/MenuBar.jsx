import {Toolbar, ToolbarButton, ToolbarDivider, ToolbarGroup, Tooltip,} from "@fluentui/react-components";
import {
    ClearFormatting24Regular,
    TextBold24Regular,
    TextBulletListLtr24Regular,
    TextCaseLowercase24Regular,
    TextHeader124Regular,
    TextHeader224Regular,
    TextHeader324Regular,
    TextItalic24Regular,
    TextNumberListLtr24Regular,
    TextStrikethrough24Regular,
    TextT24Filled
} from "@fluentui/react-icons";


const MenuBar = ({editor}) => {
    if (!editor) {
        return null
    }

    return (
        <Toolbar aria-label="Toolbar" size="small">
            <ToolbarGroup role="presentation">
                <Tooltip content="Bold" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in bold"
                        appearance={editor.isActive('bold') ? 'primary' : 'transparent'}
                        icon={<TextBold24Regular/>}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    />
                </Tooltip>
                <Tooltip content="Italic" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in italic"
                        appearance={editor.isActive('italic') ? 'primary' : 'transparent'}
                        icon={<TextItalic24Regular/>}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    />
                </Tooltip>
                <Tooltip content="Strike" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in strike"
                        appearance={editor.isActive('strike') ? 'primary' : 'transparent'}
                        icon={<TextStrikethrough24Regular/>}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                    />
                </Tooltip>
                <Tooltip content="Text Code" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in code"
                        appearance={editor.isActive('code') ? 'primary' : 'transparent'}
                        icon={<TextCaseLowercase24Regular/>}
                        onClick={() => editor.chain().focus().toggleCode().run()}
                    />
                </Tooltip>
                <Tooltip content="Heading 1" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in H1"
                        appearance={editor.isActive('heading', {level: 1}) ? 'primary' : 'transparent'}
                        icon={<TextHeader124Regular/>}
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                    />
                </Tooltip>
                <Tooltip content="Heading 2" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in H2"
                        appearance={editor.isActive('heading', {level: 2}) ? 'primary' : 'transparent'}
                        icon={<TextHeader224Regular/>}
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    />
                </Tooltip>
                <Tooltip content="Heading 3" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in H3"
                        appearance={editor.isActive('heading', {level: 3}) ? 'primary' : 'transparent'}
                        icon={<TextHeader324Regular/>}
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                    />
                </Tooltip>
                <Tooltip content="Paragraph" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in paragraph"
                        appearance={editor.isActive('paragraph') ? 'primary' : 'transparent'}
                        icon={<TextT24Filled/>}
                        onClick={() => editor.chain().focus().setParagraph().run()}
                    />
                </Tooltip>
                <Tooltip content="Remove Format" relationship="description" withArrow>
                    <ToolbarButton
                        appearance="transparent"
                        aria-label="clearNodes"
                        icon={<ClearFormatting24Regular/>}
                        onClick={() => editor.chain().focus().clearNodes().run()}
                    />
                </Tooltip>
            </ToolbarGroup>
            <ToolbarDivider/>
            <ToolbarGroup role="presentation">
                <Tooltip content="Bullet List" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in bullet list"
                        appearance={editor.isActive('bulletList') ? 'primary' : 'transparent'}
                        icon={<TextBulletListLtr24Regular/>}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    />
                </Tooltip>
                <Tooltip content="Ordered List" relationship="description" withArrow>
                    <ToolbarButton
                        aria-label="text in ordered list"
                        appearance={editor.isActive('orderedList') ? 'primary' : 'transparent'}
                        icon={<TextNumberListLtr24Regular/>}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    />
                </Tooltip>
            </ToolbarGroup>
        </Toolbar>
    )
}

export default MenuBar