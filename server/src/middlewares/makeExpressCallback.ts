/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Express callback generator which creates and handles errors from controller functions.
 * @param controller Controller Promise function to be executed
 * @returns a callback for express
 */
export default function makeExpressCallback(controller: any) {
  return async (req: any, res: any, next: any) => {
    try {
      const response = await controller(req, res);
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
}
