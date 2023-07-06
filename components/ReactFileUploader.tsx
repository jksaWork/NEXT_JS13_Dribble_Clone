"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImagePreview);
// Our app
function FileUploader({ Files, setFiles }: { Files: any; setFiles: any }) {
  //   const [files, setFiles] = useState([]);
  return (
    <>
      <FilePond
        //    files={Files}
        onupdatefiles={(fileItems) => {
          const file = fileItems[0].file;
          console.log(file);
          if (!file) return;

          if (!file.type.includes("image")) {
            alert("Please upload an image!");

            return;
          }

          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {
            const result = reader.result as string;

            setFiles(result);
          };
        }}
        maxFiles={3}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </>
  );
}
export default FileUploader;
