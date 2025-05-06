'use strict';

var workflows = require('./workflows.js');
var stages = require('./stages.js');
var stagePermissions = require('./stage-permissions.js');
var assignees = require('./assignees.js');
var validation = require('./validation.js');
var index = require('./metrics/index.js');
var weeklyMetrics = require('./metrics/weekly-metrics.js');
var documentServiceMiddleware = require('./document-service-middleware.js');

var services = {
    workflows,
    stages,
    'stage-permissions': stagePermissions,
    assignees,
    validation: validation,
    'document-service-middlewares': documentServiceMiddleware,
    'workflow-metrics': index.default,
    'workflow-weekly-metrics': weeklyMetrics
};

module.exports = services;
//# sourceMappingURL=index.js.map
