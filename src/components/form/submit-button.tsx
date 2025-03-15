import { useStore } from "@tanstack/react-form";
import { useFormContext } from ".";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button type="submit" disabled={isSubmitting || !canSubmit}>
      {children}
    </Button>
  );
};
