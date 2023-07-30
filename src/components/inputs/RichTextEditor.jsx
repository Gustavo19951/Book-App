import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Card, makeStyles} from "@fluentui/react-components";
import MenuBar from "./MenuBar.jsx";


const useStyles = makeStyles({
    container: {
        display: "flex",
        rowGap: "5px",
        flexDirection: "column"
    }
});


const RichTextEditor = ({
                            withToolBar = false,
                            content = '',
                            editable = false,
                            type = "filled",
                            handleEdit = html => {
                            },
                        }) => {
    const classes = useStyles();
    let editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content: `${content}`,
        editable: editable,
        onUpdate({editor}) {
            handleEdit(editor.getHTML());
        },
    });
    return (
        <div className={classes.container}>
            {withToolBar &&
                <Card size="small" appearance={type} style={{padding: 4}}>
                    <MenuBar editor={editor}/>
                </Card>
            }
            <EditorContent editor={editor}/>
        </div>
    )
}

export default RichTextEditor;