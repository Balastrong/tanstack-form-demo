export function validateUsername(username: string) {
  return new Promise<string | undefined>((resolve) => {
    console.log("Validating username: " + username);
    setTimeout(() => {
      resolve(
        ["foo", "bar", "baz"].includes(username)
          ? "Username already taken"
          : undefined
      );
    }, 100);
  });
}
