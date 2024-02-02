const serviceService = require("../services/service.service");

// Get Single Service
exports.getSingleService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getSingleService(serviceId);
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add New Service
exports.addNewService = async (req, res) => {
  try {
    const { service_name, service_description } = req.body;
    await serviceService.addNewService(service_name, service_description);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
