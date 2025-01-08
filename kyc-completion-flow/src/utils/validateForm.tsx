import { userSchema } from "../types";

export const validateForm = ({
  formState,
  errorState,
  setErrorState,
}: {
  formState: Record<string, any>;
  errorState: Record<string, string>;
  setErrorState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}): boolean => {
  // Create a partial schema dynamically based on the keys in formState
  const schemaKeys = Object.keys(userSchema.shape);
  const formKeys = Object.keys(formState);
  const keysToValidate = schemaKeys.filter((key) => formKeys.includes(key));
  debugger;

  // Define a utility to dynamically create the schema object.
  const partialSchema = userSchema.pick(
    Object.fromEntries(
      keysToValidate.map((key) => {
        if (key in userSchema.shape) {
          return [key, true]; // Valid key, set value to true
        }
        return [key, false]; // In case an invalid key is found, set to false
      })
    ) as Record<keyof typeof userSchema.shape, true> // Ensure the shape of the object is correct
  );

  // Validate the formState against the partial schema
  const result = partialSchema.safeParse(formState);

  if (!result.success) {
    // Create a copy of the current error state
    const newErrors: Record<string, string> = { ...errorState };

    // Map validation errors to the corresponding fields
    result.error.errors.forEach((error) => {
      const fieldPath = error.path[0]; // The field causing the error
      if (fieldPath in newErrors) {
        newErrors[fieldPath] = error.message;
      }
    });

    // Update the error state
    setErrorState(newErrors);
    return false;
  }

  const clearedErrors = Object.keys(errorState).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);

  setErrorState(clearedErrors);
  return true;
};