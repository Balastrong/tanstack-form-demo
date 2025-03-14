import { validateUsername } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, LoaderCircle, X } from "lucide-react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const UsernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters!!!");

export const SignUp = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      interests: [] as string[],
      skills: [] as { language: string; rating: number }[],
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.username || !value.password) {
          return "Please fill in all fields";
        }
      },
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Creating a form with <span className="font-bold">@DevLeonardo</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field
            name="username"
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: ({ value }) => validateUsername(value),
              onChange: UsernameSchema,
            }}
            children={(field) => (
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <LoaderCircle className="animate-spin" />
                    </div>
                  )}
                </div>
                {field.state.meta.errors && (
                  <p className="text-destructive text-sm mt-1">
                    {field.state.meta.errors.map((e) =>
                      typeof e === "object" ? e.message : e
                    )}
                  </p>
                )}
              </div>
            )}
          />
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters long";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
              },
            }}
            children={(field) => (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) =>
                value !== fieldApi.form.getFieldValue("password") &&
                "Passwords do not match",
            }}
            children={(field) => (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <div>
            <form.Field
              name="interests"
              mode="array"
              children={(field) => (
                <>
                  <Label className="mr-2">Interests</Label>
                  {field.state.value.map((_, index) => (
                    <div key={index} className="flex gap-2 my-2">
                      <Select
                        value={`${index}`}
                        onValueChange={(newIndex) =>
                          field.moveValue(index, +newIndex)
                        }
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {field.state.value.map((_, index) => (
                            <SelectItem key={index} value={`${index}`}>
                              # {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <form.Field
                        name={`interests[${index}]`}
                        children={(subField) => (
                          <Input
                            type="text"
                            value={subField.state.value}
                            autoFocus
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                          />
                        )}
                      />
                      <Button
                        variant={"destructive"}
                        onClick={() => field.removeValue(index)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => field.pushValue("")}
                  >
                    Add
                  </Button>
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="skills"
              mode="array"
              children={(field) => (
                <>
                  <Label className="mr-2">Skills</Label>
                  {field.state.value.map((_, index) => (
                    <div key={index} className="flex gap-2 my-2">
                      <form.Field
                        name={`skills[${index}].language`}
                        children={(subField) => (
                          <Input
                            type="text"
                            value={subField.state.value}
                            autoFocus
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                          />
                        )}
                      />
                      <form.Field
                        name={`skills[${index}].rating`}
                        children={(subField) => (
                          <Input
                            type="number"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.valueAsNumber)
                            }
                          />
                        )}
                      />
                      <Button
                        variant={"destructive"}
                        onClick={() => field.removeValue(index)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => field.pushValue({ language: "", rating: 0 })}
                  >
                    Add
                  </Button>
                </>
              )}
            />
          </div>
          <form.Subscribe
            selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <Alert variant={"destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors}</AlertDescription>
                </Alert>
              )
            }
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => console.log(form.state.values)}
        >
          Debug
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isValidating]}
          children={([canSubmit, isValidating]) => (
            <Button
              onClick={form.handleSubmit}
              disabled={!canSubmit || isValidating}
            >
              Sign Up
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
};
