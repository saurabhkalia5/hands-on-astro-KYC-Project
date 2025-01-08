import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import "./UploadDocuments.styles.css";
import { updateUser, userStore } from "../../../userStore";
import SubmitButton from "../../input-components/submitButtons/submitButtons";
import HeadingTile from "../../HeadingTile/headingTile.component";
import { validateForm } from "../../../utils/validateForm";
import {
  FILE_UPLOAD_DEFAULT_VALUES,
  convertFileToBase64,
} from "../../../utils/fileUpload.service";
import GenericFileUpload from "../../input-components/genericFileUpload/GenericFileUpload.component";

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
  const [errorState, setErrorState] = useState<Record<string, string>>({
    panCard: "",
    signature: "",
  });

  // Preview state for pan card and signature
  const [previewState, setPreviewState] = useState({
    panCard:
      currentUser.documents.pan_card === FILE_UPLOAD_DEFAULT_VALUES.panCard
        ? null
        : currentUser.documents.pan_card,
    signature:
      currentUser.documents.signature === FILE_UPLOAD_DEFAULT_VALUES.signature
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
        panCard: null,
        signature: null,
      };

      if (
        currentUser.documents.pan_card &&
        currentUser.documents.pan_card !== FILE_UPLOAD_DEFAULT_VALUES.panCard
      ) {
        newFormState.panCard = new File([], "panCard"); // Initially set to an empty file
        newPreviewState.panCard = currentUser.documents.pan_card; // Set the preview URL
      }

      if (
        currentUser.documents.signature &&
        currentUser.documents.signature !== FILE_UPLOAD_DEFAULT_VALUES.signature
      ) {
        newFormState.signature = new File([], "signature"); // Initially set to an empty file
        newPreviewState.signature = currentUser.documents.signature; // Set the preview URL
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
      setPreviewState((prev) => ({ ...prev, panCard: null }));
      updateUser("documents.pan_card", FILE_UPLOAD_DEFAULT_VALUES.panCard);
    } else if (type === "signature") {
      setFormState((prev) => ({ ...prev, signature: null }));
      setPreviewState((prev) => ({ ...prev, signature: null }));
      updateUser("documents.signature", FILE_UPLOAD_DEFAULT_VALUES.signature);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertFileToBase64(file, setGeneralError);

      if (type === "panCard") {
        setFormState((prev) => ({ ...prev, panCard: file }));
        setErrorState((prev) => ({ ...prev, panCard: "" }));
        setPreviewState((prev) => ({ ...prev, panCard: base64 }));
        updateUser("documents.pan_card", base64);
      } else if (type === "signature") {
        setFormState((prev) => ({ ...prev, signature: file }));
        setPreviewState((prev) => ({ ...prev, signature: base64 }));
        setErrorState((prev) => ({ ...prev, signature: "" }));
        updateUser("documents.signature", base64);
      }
    }
  };

  const handleValidation = () => {
    const validationResponse = validateForm({
      formState: previewState,
      errorState: errorState,
      setErrorState: setErrorState,
    });
    return validationResponse;
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
          <GenericFileUpload
            title={"PAN Card"}
            description={"Click a picture of your PAN Card and upload."}
            onFileChange={handleFileUpload}
            onRemove={removeImage}
            id={"panCard"}
            preview={previewState.panCard}
            error={errorState.panCard}
          />
          <div className="partition"></div>
          <GenericFileUpload
            title={"Signature"}
            description={
              "Sign on a blank white paper (same as in Bank records). Click a picture & upload."
            }
            onFileChange={handleFileUpload}
            onRemove={removeImage}
            id={"signature"}
            preview={previewState.signature}
            error={errorState.signature}
          />

          {generalError && (
            <div className="general error-message">{generalError}</div>
          )}
        </section>
      </div>

      <SubmitButton
        nextRoute={isEditable ? "/confirmDetails" : "/fatcaDeclaration"}
        validate={handleValidation}
      />
    </div>
  );
};

export default UploadDocumentsForm;
