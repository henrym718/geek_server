/**
 * Genera un número aleatorio entre 0 y 1
 * @returns número entre 0 (inclusive) y 1 (exclusive)
 */
export const getRandomNumber = (): number => {
    return Math.random();
};

/**
 * Genera un número aleatorio entre min y max
 * @param min número mínimo (inclusive)
 * @param max número máximo (exclusive)
 * @returns número aleatorio entre min y max
 */
export const getRandomNumberInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

// Ejemplos de uso:
// const random0to1 = getRandomNumber(); // 0.123456789
// const random1to10 = getRandomNumberInRange(1, 10); // 5.678901234 