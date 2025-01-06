import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import "./UploadDocuments.styles.css";
import { updateUser, userStore } from "../../../userStore";
import SubmitButton from "../../submitButtons/submitButtons";
import HeadingTile from "../../HeadingTile/headingTile.component";
import AddIcon from "../../../assets/add:remove.png";

interface UploadDocumentsFormProps {
  isEditable?: boolean;
}

const UploadDocumentsForm: React.FC<UploadDocumentsFormProps> = ({
  isEditable,
}) => {
  const currentUser = useStore(userStore);

  const [formState, setFormState] = useState({
    panCard: null as File | null,
    signature: null as File | null,
  });

  // Error state for validation
  const [errorState, setErrorState] = useState({
    panCard: "",
    signature: "",
  });

  // Preview state for pan card and signature
  const [previewState, setPreviewState] = useState({
    panCardPreview:
      currentUser.documents.pan_card ===
      "https://i.etsystatic.com/36262552/r/il/e99d3d/4200185857/il_570xN.4200185857_4q6q.jpg"
        ? null
        : currentUser.documents.pan_card,
    signaturePreview:
      currentUser.documents.signature ===
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8dfNitSE3DimQsl9LmGzBvSORvE0Cj17Vg&s"
        ? null
        : currentUser.documents.signature,
  });

  // Error state for general form
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      const newFormState: any = {
        panCard: null,
        signature: null,
      };

      const newPreviewState: any = {
        panCardPreview: null,
        signaturePreview: null,
      };

      if (
        currentUser.documents.pan_card &&
        currentUser.documents.pan_card !==
          "https://i.etsystatic.com/36262552/r/il/e99d3d/4200185857/il_570xN.4200185857_4q6q.jpg"
      ) {
        newFormState.panCard = new File([], "panCard"); // Initially set to an empty file
        newPreviewState.panCardPreview = currentUser.documents.pan_card; // Set the preview URL
      }

      if (
        currentUser.documents.signature &&
        currentUser.documents.signature !==
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8dfNitSE3DimQsl9LmGzBvSORvE0Cj17Vg&s"
      ) {
        newFormState.signature = new File([], "signature"); // Initially set to an empty file
        newPreviewState.signaturePreview = currentUser.documents.signature; // Set the preview URL
      }

      // Update the state
      setFormState(newFormState);
      setPreviewState(newPreviewState);
    }
  }, [currentUser]);

  // Reset error after 5 seconds
  useEffect(() => {
    if (generalError) {
      setTimeout(() => {
        setGeneralError(null);
      }, 5000);
    }
  }, [generalError]);

  const removeImage = (type: string) => {
    if (type === "panCard") {
      setFormState((prev) => ({ ...prev, panCard: null }));
      setPreviewState((prev) => ({ ...prev, panCardPreview: null }));
      updateUser(
        "documents.pan_card",
        "https://i.etsystatic.com/36262552/r/il/e99d3d/4200185857/il_570xN.4200185857_4q6q.jpg"
      );
    } else if (type === "signature") {
      setFormState((prev) => ({ ...prev, signature: null }));
      setPreviewState((prev) => ({ ...prev, signaturePreview: null }));
      updateUser(
        "documents.signature",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8dfNitSE3DimQsl9LmGzBvSORvE0Cj17Vg&s"
      );
    }
  };

  const convertFileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        setGeneralError("File size exceeds 2MB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "panCard" | "signature"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertFileToBase64(file);

      if (type === "panCard") {
        setFormState((prev) => ({ ...prev, panCard: file }));
        setErrorState((prev) => ({ ...prev, panCard: "" }));
        setPreviewState((prev) => ({ ...prev, panCardPreview: base64 }));
        updateUser("documents.pan_card", base64);
      } else if (type === "signature") {
        setFormState((prev) => ({ ...prev, signature: file }));
        setPreviewState((prev) => ({ ...prev, signaturePreview: base64 }));
        setErrorState((prev) => ({ ...prev, signature: "" }));
        updateUser("documents.signature", base64);
      }
    }
  };

  // Validation for pan card and signature
  const validateForm = () => {
    let isValid = true;

    if (!formState.panCard) {
      setErrorState((prev) => ({
        ...prev,
        panCard: "Pan Card cannot be empty",
      }));
      isValid = false;
    }

    if (!formState.signature) {
      setErrorState((prev) => ({
        ...prev,
        signature: "Signature cannot be empty",
      }));
      isValid = false;
    }

    return isValid;
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
                {previewState.panCardPreview ? (
                  <div className="image-container">
                    <img
                      src={previewState.panCardPreview}
                      alt="PAN Card Preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage("panCard")}
                      aria-label="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <span>Upload PAN Card</span>
                )}
              </label>
            </div>
          </div>
          {errorState.panCard && (
            <div className="error-message">{errorState.panCard}</div>
          )}
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
                {previewState.signaturePreview ? (
                  <div className="image-container">
                    <img
                      src={previewState.signaturePreview}
                      alt="Signature Preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage("signature")}
                      aria-label="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <span>Upload Signature</span>
                )}
              </label>
            </div>
          </div>
          {errorState.signature && (
            <div className="error-message">{errorState.signature}</div>
          )}

          {generalError && <div className="error-message">{generalError}</div>}
        </section>
      </div>

      <SubmitButton
        nextRoute={isEditable ? "/confirmDetails" : "/fatcaDeclaration"}
        validate={validateForm}
      />
    </div>
  );
};

export default UploadDocumentsForm;
