export const convertFileToBase64 = (file: File,setGeneralError:React.Dispatch<React.SetStateAction<string | null>>) =>
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

export const FILE_UPLOAD_DEFAULT_VALUES = {
    panCard : "https://i.etsystatic.com/36262552/r/il/e99d3d/4200185857/il_570xN.4200185857_4q6q.jpg",
    signature: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8dfNitSE3DimQsl9LmGzBvSORvE0Cj17Vg&s",
    photo: "https://static.vecteezy.com/system/resources/previews/007/296/447/non_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg",
}