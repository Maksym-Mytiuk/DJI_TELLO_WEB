export function handleError(err: Error | null) {
  if (err) {
    console.log("Error");
    console.log(err);
  }
}
