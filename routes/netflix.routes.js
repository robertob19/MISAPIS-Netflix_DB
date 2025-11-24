
import { Router } from 'express';
import {
  getAllNetflix,
  getNetflixById,
  postNetflix,
  putNetflix,
  deleteNetflix
} from '../controllers/netflix.controller.js';

const netflix = Router();

netflix.get('/', getAllNetflix);
netflix.get('/:id', getNetflixById);
netflix.post('/', postNetflix);
netflix.put('/:id', putNetflix);
netflix.delete('/:id', deleteNetflix);


export default netflix;
