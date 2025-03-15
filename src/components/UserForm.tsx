import { z } from "zod";
import { useAppForm } from "./form";

// #region schemas and defaults
const ContactMethod = z.union([
  z.literal("email"),
  z.literal("phone"),
  z.literal("whatsapp"),
  z.literal("sms"),
]);
type ContactMethod = z.infer<typeof ContactMethod>;

const ContactMethods = ContactMethod.options.map(({ value }) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const UserSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Z]/, "Name must start with a capital letter")
    .min(3, "Name must be at least 3 characters long"),
  surname: z
    .string()
    .min(3, "Surname must be at least 3 characters long")
    .regex(/^[A-Z]/, "Surname must start with a capital letter"),
  isAcceptingTerms: z.boolean().refine((val) => val, {
    message: "You must accept the terms and conditions",
  }),
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    preferredContactMethod: ContactMethod,
  }),
});
type User = z.infer<typeof UserSchema>;

const defaultUser = {
  name: "",
  surname: "",
  isAcceptingTerms: false,
  contact: {
    email: "",
    phone: "",
    preferredContactMethod: "email",
  },
} as User;
// #endregion

export const UserForm = () => {
  const form = useAppForm({
    defaultValues: defaultUser,
    validators: {
      onChange: UserSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
    },
  });

  return (
    <form
      className="flex flex-col gap-2 w-[400px]"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="name"
        children={(field) => <field.TextField label="Name" />}
      />
      <form.AppField
        name="surname"
        children={(field) => <field.TextField label="Surname" />}
      />
      <form.AppField
        name="isAcceptingTerms"
        children={(field) => (
          <field.CheckboxField label="I accept the terms and conditions" />
        )}
      />

      <div className="my-2">
        <h3 className="text-lg font-medium ">Contacts</h3>
        <div className="flex-col gap-4">
          <form.AppField
            name="contact.email"
            children={(field) => <field.TextField label="Email" type="email" />}
          />
          <form.AppField
            name="contact.phone"
            children={(field) => <field.TextField label="Phone" />}
          />
          <form.AppField
            name="contact.preferredContactMethod"
            children={(field) => (
              <field.SelectField
                label="Preferred Contact Method"
                options={ContactMethods}
              />
            )}
          />
        </div>
      </div>
      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
