import{j as e}from"./index-DrhACB-D.js";import{U as u,c as E}from"./Upload-ChF5xKSK.js";import{r as i}from"./index-DQDNmYQF.js";import{useMDXComponents as b}from"./index-DmqVK_gK.js";import{S as d}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const p=l=>{const[a,s]=i.useState([]);return e.jsx(u,{files:a,setFiles:s,name:"files",uploadLabel:"Click to upload a file",dragAndDropOptions:{dragLabel:"Drag file here to upload",dropLabel:"Drop the file to upload"},allowedFormats:[".png",".xls"],multiple:!0,maxFileSize:1024*1024,...l})},r=l=>{const a=i.useRef(),[s,j]=i.useState([]);return e.jsxs(e.Fragment,{children:[e.jsx(u,{files:s,setFiles:j,name:"files",uploadLabel:"Click or drag to upload a file",dragAndDropOptions:{dragLabel:"Drag file here to upload",dropLabel:"Drop the file to upload"},allowedFormats:[".png"],multiple:!0,externalUpload:a,...l}),e.jsx(E,{label:"Upload file",onClick:async()=>{var c;return await((c=a.current)==null?void 0:c.upload())}})]})};try{p.displayName="UploadExample",p.__docgenInfo={description:"",displayName:"UploadExample",props:{}}}catch{}try{r.displayName="ExternalUploadExample",r.__docgenInfo={description:"",displayName:"ExternalUploadExample",props:{}}}catch{}const n={upload:[{language:"jsx",snippet:`
            <Upload
                files={files}
                setFiles={setFiles}
                name="files"
                uploadLabel="Click to upload a file"
                dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                allowedFormats={['.png']}
                multiple
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Upload } from './Upload';

            export const UploadExample = (props) => {
                const [files, setFiles] = useState([]);
                return (
                    <Upload
                        files={files}
                        setFiles={setFiles}
                        name="files"
                        uploadLabel="Click to upload a file"
                        dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                        allowedFormats={['.png']}
                        multiple
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Upload
                files={files}
                setFiles={setFiles}
                name="files"
                uploadLabel="Click or drag to upload a file"
                dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                allowedFormats={['.png']}
                multiple
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Upload } from './Upload';
            
            export const UploadExample: FC = (props: any) => {
                const [files, setFiles] = useState<File[]>([]);
                return (
                    <Upload
                        files={files}
                        setFiles={setFiles}
                        name="files"
                        uploadLabel="Click to upload a file"
                        dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                        allowedFormats={['.png']}
                        multiple
                    />
                );
            };
            `}],externalUploadExample:[{language:"jsx",snippet:`
            <>
                <Upload
                    files={files}
                    setFiles={setFiles}
                    name="files"
                    uploadLabel="Click to upload a file"
                    dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                    allowedFormats={['.png']}
                    multiple
                    externalUpload={uploadExternally}
                />
                <Button
                    label="Upload file"
                    onClick={async () => await uploadExternally.current?.upload()}
                />
            </>
            `,expandedSnippet:`
            import React, { useRef, useState } from 'react';
            import { Button } from '../Button';
            import { Upload } from './Upload';

            export const ExternalUploadExample = (props) => {
                const uploadExternally = useRef();
                const [files, setFiles] = useState([]);
                return (
                    <>
                        <Upload
                            files={files}
                            setFiles={setFiles}
                            name="files"
                            uploadLabel="Click to upload a file"
                            dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                            allowedFormats={['.png']}
                            multiple
                            externalUpload={uploadExternally}
                        />
                        <Button
                            label="Upload file"
                            onClick={async () => await uploadExternally.current?.upload()}
                        />
                    </>
                );
            };
            `},{language:"tsx",snippet:`
            <>
                <Upload
                    files={files}
                    setFiles={setFiles}
                    name="files"
                    uploadLabel="Click to upload a file"
                    dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                    allowedFormats={['.png']}
                    multiple
                    externalUpload={uploadExternally}
                />
                <Button
                    label="Upload file"
                    onClick={async () => await uploadExternally.current?.upload()}
                />
            </>
            `,expandedSnippet:`
            import React, { FC, useRef, useState } from 'react';
            import { Button } from '../Button';
            import { Upload } from './Upload';

            export const ExternalUploadExample: FC = (props: any) => {
                const uploadExternally = useRef<{ upload: () => Promise<void> }>();
                const [files, setFiles] = useState<File[]>([]);
                return (
                    <>
                        <Upload
                            files={files}
                            setFiles={setFiles}
                            name="files"
                            uploadLabel="Click to upload a file"
                            dragAndDropOptions={{ dragLabel : 'Drag file here to upload', dropLabel: "Drop the file to upload"}}
                            allowedFormats={['.png']}
                            multiple
                            externalUpload={uploadExternally}
                        />
                        <Button
                            label="Upload file"
                            onClick={async () => await uploadExternally.current?.upload()}
                        />
                    </>
                );
            };
            `}],allowedProperties:[{language:"jsx",snippet:`
            allowedFormats={['.png', '.jpg', '.gif']}
            `,expandedSnippet:`
            allowedFormats={['.png', '.jpg', '.gif']}
            `},{language:"tsx",snippet:`
            allowedFormats={['.png', '.jpg', '.gif']}
            `,expandedSnippet:`
            allowedFormats={['.png', '.jpg', '.gif']}
            `}]};function m(l){const a={p:"p",...b(),...l.components};return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Upload v",void 0]}),e.jsx("p",{children:"Element that allows uploading one or more files."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(d,{snippets:n.upload,children:e.jsx(p,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Upload with with external button trigger"}),e.jsx("p",{children:e.jsx(a.p,{children:`You can define a ref and pass it to the upload component and then trigger\r
the upload via an external button if you need.`})}),e.jsx(d,{snippets:n.externalUploadExample,children:e.jsx(r,{})}),e.jsx("hr",{}),e.jsx("h3",{children:"Upload allowed formats"}),e.jsx("p",{children:e.jsxs(a.p,{children:["Allowed formats for Upload can be specified by using the"," ",`\r
`,e.jsx("b",{children:"allowedFormats"})," property, that accepts a ",e.jsx("i",{children:"string array"}),"."]})}),e.jsx(d,{snippets:n.allowedProperties,children:"See expanded code"})]})}function y(l={}){const{wrapper:a}={...b(),...l.components};return a?e.jsx(a,{...l,children:e.jsx(m,{...l})}):m(l)}const A={title:"UnifiedUI/Upload",component:u,parameters:{docs:{page:y}}},o={render:l=>e.jsx(p,{...l})},t={render:l=>e.jsx(r,{...l})};var f,x,g;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => <UploadExample {...args} />
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,U,F;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: (args: any) => <ExternalUploadExample {...args} />
}`,...(F=(U=t.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};const O=["BaseUpload","ExternalUpload"];export{o as BaseUpload,t as ExternalUpload,O as __namedExportsOrder,A as default};
