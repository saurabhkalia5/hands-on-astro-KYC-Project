import React, { useState } from 'react';
import './UploadDocuments.styles.css'

const UploadDocumentsForm: React.FC = () => {
  const [panCard, setPanCard] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'panCard') {
        setPanCard(file);
      } else if (type === 'signature') {
        setSignature(file);
      }
    }
  };

  return (
    <section className="upload-container">
      {/* PAN Card Section */}
      <div className="upload-section">
        <h3>PAN Card</h3>
        <p>Click a picture of your PAN Card and upload</p>
        <div className="upload-box">
          <input 
            type="file" 
            accept="image/*" 
            id="pan-upload" 
            className="hidden" 
            onChange={(e) => handleFileUpload(e, 'panCard')} 
          />
          <label htmlFor="pan-upload" className="upload-label">
            <span>Upload PAN Card</span>
          </label>
        </div>
      </div>

      {/* Signature Section */}
      <div className="upload-section">
        <h3>Signature</h3>
        <p>Sign on a blank white paper (same as in Bank records). Click a picture & upload.</p>
        <div className="upload-box">
          <input 
            type="file" 
            accept="image/*" 
            id="signature-upload" 
            className="hidden" 
            onChange={(e) => handleFileUpload(e, 'signature')} 
          />
          <label htmlFor="signature-upload" className="upload-label">
            <span>Upload Signature</span>
          </label>
        </div>
      </div>

      <div className="submit-buttons">
        <a href="/fatcaDeclaration">
          <button className="next-button">Next</button>
        </a>
        <a href="/fatcaDeclaration">
          <button className="skip-button">Skip for Now</button>
        </a>
      </div>
    </section>
  );
};

export default UploadDocumentsForm;
