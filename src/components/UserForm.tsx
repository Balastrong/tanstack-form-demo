export const UserForm = () => {
  return (
    <form
      className="flex flex-col gap-2 w-[400px]"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      One day I'll be a real form
    </form>
  );
};
