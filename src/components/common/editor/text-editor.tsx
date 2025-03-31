"use client";

import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Toolbar } from "./toolbar";

export interface EditorProps {
  onContentChange: (content: string) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const Editor = ({
  value,
  onContentChange,
  disabled = false,
  placeholder,
  className,
  ...props
}: EditorProps) => {
  const editorConfig = useEditor({
    content: typeof value === "string" ? value : "",
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-4" },
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-4" },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] max-h-[150px] w-full border-t-0 border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4",
      },
    },
    onUpdate: ({ editor }) => {
      if (!disabled) {
        onContentChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editorConfig && value !== editorConfig.getHTML()) {
      editorConfig.commands.setContent(value as Content);
    }
  }, [editorConfig, value]);

  return (
    <>
      <div className="flex flex-col">
        {editorConfig ? <Toolbar editor={editorConfig} /> : null}
        <EditorContent
          placeholder={placeholder}
          {...props}
          editor={editorConfig}
          className={cn("resize-y", className)}
        />
      </div>
    </>
  );
};