// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function errorHandlingMiddleware(err: ReturnType<typeof utils.createError>, _: any, res: any, __: any) {
  // Check if the error has a status code and error message
  const status = err.status || 500;
  const errorMessage = err.message || status == 500 ? "Internal Server Error" : "Oops something went wrong";

  // Check if there is additional data in the error object
  const additionalData = err.data || null;

  // Log the error for debugging purposes
  if (status == 500) console.error(`Error ${status}: ${errorMessage}`);

  // Respond with the appropriate status code and error message
  res.status(status).json({ status: status, message: errorMessage, data: additionalData });
}
