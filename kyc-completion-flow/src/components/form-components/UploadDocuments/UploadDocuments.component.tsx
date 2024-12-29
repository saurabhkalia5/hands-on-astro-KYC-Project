import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import "./UploadDocuments.styles.css";
import { updateUser, userStore } from "../../../userStore";
import SubmitButton from "../../submitButtons/submitButtons";
import HeadingTile from "../../HeadingTile/headingTile.component";
import AddIcon from '../../../assets/add:remove.png'


const UploadDocumentsForm: React.FC = () => {
  const [panCard, setPanCard] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [panCardPreview, setPanCardPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  const convertFileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setError("File size exceeds 2MB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file); // Reads the file as a Base64 string
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertFileToBase64(file);

      if (type === "panCard") {
        setPanCard(file);
        setPanCardPreview(base64);
        updateUser("documents.pan_card", base64); // Update Nanostore
      } else if (type === "signature") {
        setSignature(file);
        setSignaturePreview(base64);
        updateUser("documents.signature", base64); // Update Nanostore
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80%",
      }}
    >
      <div>
        <HeadingTile title="Upload Documents" />
        <section className="upload-container">
          <div className="upload-section">
            <div className="text-section">
              <h3>PAN Card</h3>
              <p>Click a picture of your PAN Card and upload.</p>
            </div>
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                id="pan-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "panCard")}
              />
              <label htmlFor="pan-upload" className="upload-label">
                {panCardPreview ? (
                  <img
                    src={panCardPreview}
                    alt="PAN Card Preview"
                    className="preview-image"
                  />
                ) : (
                  <span>Upload PAN Card</span>
                )}
              </label>
            </div>
          </div>
          <div className="partition"></div>
          <div className="upload-section">
            <div className="text-section">
              <h3>Signature</h3>
              <p>
                Sign on a blank white paper (same as in Bank records). Click a
                picture & upload.
              </p>
            </div>
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                id="signature-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "signature")}
              />
              <label htmlFor="signature-upload" className="upload-label">
                {signaturePreview ? (
                  <img
                    src={signaturePreview}
                    alt="Signature Preview"
                    className="preview-image"
                    
                  />
                ) : (
                  <span>Upload Signature</span>
                )}
              </label>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
        </section>
      </div>

      {/* <div className="submit-buttons">
        <a href="/fatcaDeclaration">
          <button className="next-button">Next</button>
        </a>
        <a href="/fatcaDeclaration">
          <button className="skip-button">Skip for Now</button>
        </a>
      </div> */}
      <SubmitButton nextRoute="/fatcaDeclaration" />
    </div>
  );
};

export default UploadDocumentsForm;
