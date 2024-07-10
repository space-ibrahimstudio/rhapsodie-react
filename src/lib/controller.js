export function inputValidator(formData, requiredFields) {
  const errors = {};
  const checkRequired = (value, field, path) => {
    if (!value) {
      errors[path.join(".")] = `The ${field} field is required`;
    }
  };
  const validateField = (data, field, path = []) => {
    if (Array.isArray(data[field])) {
      data[field].forEach((item, index) => {
        Object.keys(item).forEach((key) => {
          if (requiredFields.includes(`${field}.${key}`)) {
            checkRequired(item[key], key, [...path, field, index, key]);
          }
        });
      });
    } else {
      checkRequired(data[field], field, [...path, field]);
    }
  };
  requiredFields.forEach((field) => {
    const [mainField, ...nestedField] = field.split(".");
    if (nestedField.length > 0) {
      validateField(formData, mainField);
    } else {
      checkRequired(formData[mainField], mainField, [mainField]);
    }
  });
  return errors;
}
