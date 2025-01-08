import React from 'react';

interface GenericFileUploadProps {
  title:string,
  description:string,
  preview:string | null,
  onFileChange : (e:React.ChangeEvent<HTMLInputElement>,value:string)=>void,
  onRemove:(type:string)=>void,
  error?:string,
  id:string,
}


const GenericFileUpload = (props:GenericFileUploadProps) => {
  return (
    <>
    <div className="upload-section">
      <div className="text-section">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          id={props.id}
          className="hidden"
          onChange={(e) => props.onFileChange(e,props.id)}
        />
        <label htmlFor={props.id} className="upload-label">
          {props.preview ? (
            <div className="image-container">
              <img
                src={props.preview}
                alt={`${props.title} Preview`}
                className="preview-image"
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={()=>props.onRemove(props.id)}
                aria-label="Remove image"
              >
                &times;
              </button>
            </div>
          ) : (
            <span>Upload {props.title}</span>
          )}
        </label>
      </div>
    </div>
    {props.error && <div className="error-message">{props.error}</div>}
    </>
  );
};

export default GenericFileUpload;
