/**Waits the specified miliseconds and then resolves without doing anything.
 * Used to stop an `async` function execution by calling it aside the `await` keyword.
 * @param {number} miliseconds The number of miliseconds to wait.
 */
function wait(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

export default wait;
