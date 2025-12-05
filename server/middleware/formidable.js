const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const parseForm = (req, res, next) => {
  // Define the upload directory path
  const uploadDir = path.join(__dirname, '../uploads');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created uploads directory at: ${uploadDir}`);
  }

  const form = new formidable.IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Formidable parse error:', err);
      return res.status(400).json({ error: 'Image upload failed', details: err.message });
    }

    console.log('✅ Fields received:', fields);
    console.log('✅ Files received:', files);

    req.fields = fields;
    req.files = files;
    next();
  });
};

module.exports = parseForm;
