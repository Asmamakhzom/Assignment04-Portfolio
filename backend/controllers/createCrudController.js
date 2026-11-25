import mongoose from "mongoose";

export default function createCrudController(Model) {
    return {
        getAll: async (req, res) => {
            try {
                const items = await Model.find();
                res.status(200).json(items);
            } catch (error) {
                res.status(500).json({message: error.message });
            }
        },

        getById: async (req, res) => {
            try {
              if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({message: 'Invalid ID'});
              }

              const item = await Model.findById(req.params.id);

              if (!item) {
                return res.status(404).json({message: 'Record not found'});

              }

              res.status(200).json(item);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
          },

          create: async (req, res) => {
            try {
                const item = await Model.create(req.body);
                res.status(201).json(item);
            } catch (error) {
                const status = error.name === 'ValidationError' ||
                 error.code === 11000 ? 400
                  : 500;
                  res.status(status).json({ message: error.message });
                }
          },

        update: async (req, res) => {
            try {
              if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ message: 'Invalid ID' });
              }

              const item = await Model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
              );

              if (!item) {
                return res.status(404).json({ message: 'Record not found' });
              }

              res.status(200).json(item);
            } catch (error) {
              res.status(400).json({ message: error.message });
            }
            },

            deleteById: async (req, res) => {
              try {
                if (!mongoose.isValidObjectId(req.params.id)) {
                  return res.status(400).json({ message: 'Invalid ID' });
                }

                const item = await Model.findByIdAndDelete(req.params.id);
                if (!item) {
                  return res.status(404).json({ message: 'Record not found' });
                }

                res.status(200).json({ message: 'Record deleted successfully' });
              } catch (error) {
                res.status(500).json({ message: error.message });
              }
            },

            deleteAll: async (req, res) => {
                try {
                const result = await Model.deleteMany();
                res.status(200).json({
                  message: 'Records deleted successfully',
                  deletedCount: result.deletedCount
                });
              } catch (error) {
                res.status(500).json({ message: error.message });
                }
            }
          };

        
        
        }
