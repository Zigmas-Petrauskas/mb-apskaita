import { checkSystemStatus } from '../services/system.service.js';

export const getSystemStatus = async (req, res) => {
  try {
    const status = await checkSystemStatus();

    res.json(status);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
