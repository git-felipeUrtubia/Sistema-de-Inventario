import { customAlphabet } from 'nanoid';


export const generatedCode = () => {
    const nanoid = customAlphabet('1234567890ABCDEFGHJKLMNPQRSTUVWXYZ', 8);
    const CodigoDeBarras = nanoid();
    return CodigoDeBarras
}

