const AuditLog = require("../model/auditLogModel");

const logActivity = async (req, res, next) => {
  // Utility function to remove sensitive fields
  const sanitizeRequestBody = (body, fieldsToRemove) => {
    const sanitizedBody = { ...body };
    fieldsToRemove.forEach(field => {
      if (sanitizedBody.hasOwnProperty(field)) {
        sanitizedBody[field] = 'REDACTED';
      }
    });
    return sanitizedBody;
  };

  try {
    next();

    // Create audit log entry after response is sent
    res.on('finish', async () => {
      const { method, originalUrl, body } = req;
      const statusCode = res.statusCode;
      const ipAddress = req.ip === '::1' ? '127.0.0.1' : req.ip; // Handle loopback address

      const sanitizedBody = sanitizeRequestBody(body, ['password']);

      await AuditLog.create({
        method,
        url: originalUrl,
        body: JSON.stringify(sanitizedBody),
        ipAddress,
        statusCode,
        userId: req.user ? req.user.id : null,
        action: req.auditAction || 'Unknown',
        details: req.auditDetails || 'No details provided',
      });
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    next();
  }
};

module.exports = logActivity;
