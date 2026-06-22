import express from 'express';
import * as controller from '../controllers/arquivoController.js';
import { upload } from '../lib/middlewares/fileGate.js';

const router = express.Router();

router.post('/:id/foto', upload.single('foto'), controller.uploadFoto);
router.get('/:id/foto', controller.buscarFoto);
router.delete('/:id/foto', controller.deletarFoto);

export default router;
