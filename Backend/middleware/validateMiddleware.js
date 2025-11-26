export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const errors = [];
    for (const f of requiredFields) {
      if (req.body[f] === undefined || req.body[f] === '') errors.push(`${f} is required`);
    }
    if (errors.length) return res.status(400).json({ message: errors.join(', ') });
    next();
  };
};
