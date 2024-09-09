'use client'
import React, { forwardRef } from 'react'
import dynamic from 'next/dynamic'
// import ReactQuill from 'react-quill'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript';
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(
   () => {
       hljs.configure({
           languages: ['javascript', 'CSS', 'HTML']
       })
       // @ts-ignore
       window.hljs = hljs
      return  import ("react-quill")
   }, {
   ssr: false,
   loading: () => <p>Quill loading</p>
})

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

hljs.registerLanguage('javascript', javascript)
const TextEditor = forwardRef<typeof ReactQuill, TextEditorProps>(({ value, onChange }, ref) => {
  const modules = {
   syntax: true,
   toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      
      ['clean']                                         // remove formatting button
   ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <ReactQuill
   //  @ts-ignore
      ref={ref}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  )
})

export default TextEditor