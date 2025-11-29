export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const errors = [];
    for (const f of requiredFields) {
      if (req.body[f] === undefined || req.body[f] === '') errors.push(`${f} is required`);
    }
    if (errors.length) {
      // Debug output to help troubleshooting multipart/form-data issues
      console.error('Validation failed. Content-Type:', req.headers['content-type']);
      console.error('Parsed req.body:', req.body);
      if (req.file) console.error('Uploaded file present:', { fieldname: req.file.fieldname, originalname: req.file.originalname, size: req.file.size });
      return res.status(400).json({ message: errors.join(', ') });
    }
    next();
  };
};
