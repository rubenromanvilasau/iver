const { prisma } = require("../db");
const StatusService = require("../services/status.service");
const statusService = new StatusService();

class StatusController {
    async getAll(req, res) {
        try {
            const statuses = await statusService.getAll();
            res.status(200).send(statuses);
        } catch (err) {
            console.log("[CONTROLLERS-STATUS] getAllStatuses ERROR", err);
           res.status(500).send(err);
        }
    }
};

module.exports = StatusController;