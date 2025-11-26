import { 
    listServices as listServicesService, 
    getService as getServiceService, 
    createService as createServiceService, 
    updateService as updateServiceService, 
    deleteService as deleteServiceService 
} from '../services/serviceService.js';

// List all services
export const listServices = async (req, res, next) => {
  try {
    const services = await listServicesService(); 
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// Get a single service by ID
export const getService = async (req, res, next) => {
  try {
    const service = await getServiceService(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    next(err);
  }
};

// Create a new service
export const createService = async (req, res, next) => {
  try {
    const name = req.body.name || undefined;
    const description = req.body.description || undefined;
    const type = req.body.type || undefined;
    const duration = req.body.duration;
    const price = req.body.price;
    const categoryId = req.body.categoryId || undefined; 
    const image = req.file ? req.file.filename : undefined;

    console.log('📸 Uploaded file:', req.file?.filename); // Debug log

    const srv = await createServiceService({
      name,
      description,
      type,
      duration,
      price,
      categoryId,
      image,
    });

    res.status(201).json(srv);
  } catch (err) {
    next(err);
  }
};

// Update an existing service
export const updateService = async (req, res, next) => {
  try {
    const rawData = {
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        price: req.body.price,
        categoryId: req.body.categoryId,
        description: req.body.description,
        image: req.file ? req.file.filename : undefined,
    };

    const data = Object.keys(rawData).reduce((acc, key) => {
        const value = rawData[key];
        if (value !== '' && value !== null && value !== undefined) {
            acc[key] = value;
        } else if (key === 'categoryId' && value === '') {
             acc[key] = null; 
        }
        return acc;
    }, {});
    
    if (Object.keys(data).length === 0 && !req.file) {
        return res.status(400).json({ message: 'No fields provided for update.' });
    }

    console.log('📸 Updated file:', req.file?.filename); // Debug log

    const updated = await updateServiceService(req.params.id, data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete a service
export const deleteService = async (req, res, next) => {
  try {
    await deleteServiceService(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    next(err);
  }
};
