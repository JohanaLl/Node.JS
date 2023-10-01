//__dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//__dirname da la ruta absoluta sin importar en que máquina se corra la aplicación
export const __dirname = dirname(fileURLToPath(import.meta.url));
