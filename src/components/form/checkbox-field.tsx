import { useFieldContext } from ".";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";

type CheckboxFieldProps = {
  label: string;
  description?: string;
};

export const CheckboxField = ({ label, description }: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => {
            field.handleChange(checked === true);
          }}
          onBlur={field.handleBlur}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={field.name} className="cursor-pointer">
            {label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
