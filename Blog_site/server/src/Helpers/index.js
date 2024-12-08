export const validateString = (str, minLength, fieldName) => {
  if (typeof str !== "string" || str.trim().length < minLength) {
    throw new Error(
      `${fieldName} must be a string with at least ${minLength} characters.`
    );
  }
};

export const validateTags = (tagsArray) => {
  if (
    !Array.isArray(tagsArray) ||
    tagsArray.some((tag) => typeof tag !== "string")
  ) {
    throw new Error("Tags must be an array of strings.");
  }
};
