import Netflix from '../models/netflix.model.js';
import mongoose from 'mongoose';
import express from 'express';


export const getAllNetflix = async (req, res) => {
  console.log('🎬 Obtener todas las producciones de Netflix');
  try {
    const producciones = await Netflix.find({}, { __v: 0 });
    if (producciones.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron producciones en Netflix'
      });
    }

    return res.status(200).json({
      producciones
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener las producciones de Netflix'
    });
  }
};

export const getNetflixById = async (req, res) => {
  console.log('📺 Obtener producción por ID');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const produccion = await Netflix.findById(id);

    if (!produccion) {
      return res.status(404).json({
        msg: 'Producción no encontrada'
      });
    }

    return res.status(200).json({
      produccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener la producción'
    });
  }
};

export const postNetflix = async (req, res) => {
  console.log('🎥 Agregar nueva producción a Netflix');

  const body = req.body;
  const nuevaProduccion = new Netflix(body);

  try {
    const validationError = nuevaProduccion.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({
        errores: errorMessages
      });
    }

    await nuevaProduccion.save();

    return res.status(201).json({
      msg: 'Producción agregada exitosamente',
      produccion: nuevaProduccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar la producción'
    });
  }
};

export const putNetflix = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const produccion = await Netflix.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!produccion) {
      return res.status(404).json({
        msg: 'Producción no encontrada'
      });
    }

    return res.status(200).json({
      msg: 'Producción actualizada correctamente',
      produccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar la producción'
    });
  }
};

export const deleteNetflix = async (req, res) => {
  console.log('🗑️ Eliminar producción de Netflix');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const produccion = await Netflix.findByIdAndDelete(id);

    if (!produccion) {
      return res.status(404).json({
        msg: 'Producción no encontrada'
      });
    }

    return res.status(200).json({
      msg: 'Producción eliminada correctamente',
      produccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al eliminar la producción'
    });
  }
};

