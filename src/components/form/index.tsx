import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./text-field";
import { CheckboxField } from "./checkbox-field";
import { SelectField } from "./select-field";
import { SubmitButton } from "./submit-button";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CheckboxField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
