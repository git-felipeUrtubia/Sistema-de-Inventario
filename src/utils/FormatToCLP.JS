
export const formatToCLP = (value) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0, // El peso chileno no usa centavos
    }).format(value);
};