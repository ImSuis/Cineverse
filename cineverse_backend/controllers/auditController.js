const AuditLog = require('../model/auditLogModel');

exports.getAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.findAll();
        res.status(200).json(auditLogs);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
