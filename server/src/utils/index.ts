/**
 * This class provides common utility functions
 */
export default class Utils {
  /**
   * This method is used to create error objects which http status codes and status messages
   * @param status Http status code for error
   * @param message Error message
   * @param data Additional data for more actions
   * @returns Objects with error details
   */
  createError(status?: number, message?: string, data?: object | null) {
    return {
      message: message ? message : "Oops something went wrong",
      status: Number(status) || 500,
      data,
    };
  }

  /**
   * To handle error in .Catch of a promise in simple way customizable error message and code
   * @param status https status code
   * @param errorMessage Error Message
   * @returns a function which throws an exception with createError object with error message and code
   */
  throwCustomError(status: number, errorMessage?: string) {
    return (error: Error) => {
      throw this.createError(status, errorMessage ?? error?.message, error);
    };
  }

  /**
   * To handle error in .Catch of a promise in simple way as internal server error
   * @param errorMessage Error message
   * @returns a function which throws an exception with createError object with error message
   */
  throwInternalError(errorMessage?: string) {
    return (error: Error) => {
      throw this.createError(500, errorMessage ?? error?.message, error);
    };
  }

  /**
   * This function handles and converts normal error to internal server error using throwInternalError.
   * First argument is promise function and rest of arguments are passed to the promise function
   * @param promiseFunction Promise function to be handled
   * @param args Arguments for the promise function
   * @returns Result of promise function
   */
  async handleInternalError<T extends (...args: Parameters<T>) => ReturnType<T>>(
    promiseFunction: T,
    ...args: Parameters<T>
  ) {
    try {
      return await promiseFunction(...args);
    } catch (error) {
      throw this.createError(500, error?.message, error);
    }
  }

  /**
   * Creates a new random id string
   * @param options Options for creating random id
   * @returns promise with random id generated according to options
   */
  generateRandomId(options?: {
    length?: number;
    withLowerCase?: boolean;
    withNumber?: boolean;
    withUpperCase?: boolean;
    withSpecialChars?: boolean;
  }): string {
    const defaultLength = 22;
    const length = options?.length || defaultLength;

    const possibilities = {
      lowerCased: "abcdefghijklmnopqrstuvwxyz",
      capitals: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      special: "~!@#$%^&()_+-={}[];',",
    };

    // Storage for setting selected chars from pattern
    let chars = "";

    if (options?.withNumber) chars += possibilities.numbers;
    if (options?.withLowerCase) chars += possibilities.lowerCased;
    if (options?.withUpperCase) chars += possibilities.capitals;
    if (options?.withSpecialChars) chars += possibilities.special;

    // default pattern
    if (chars.length == 0) chars += possibilities.capitals;

    // accumulator for result
    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  /**
   * * This function returns a random id when the promise function returns nothing or nullifying value.
   * * This is used in creation of unique ids.
   * @param options Options for creating random id
   * @param promiseFunctionWithResults Promise function to be called to return data to generate random id on non existence of response
   * @param argsOfPromiseFunction Arguments for the promise functions function
   * @returns promise with random id (string) generated according to options
   */
  async generateRandomIdWithExistingValidation<T extends (...args: Parameters<T>) => ReturnType<T>>(
    options: Parameters<typeof this.generateRandomId>[0],
    promiseFunctionWithResults: T,
    ...argsOfPromiseFunction: Parameters<T>
  ): Promise<string> {
    let id: string;
    do {
      id = this.generateRandomId(options);
    } while (await promiseFunctionWithResults(...argsOfPromiseFunction));
    return id;
  }
}
