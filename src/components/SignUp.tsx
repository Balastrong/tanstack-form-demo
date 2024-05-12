import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "@tanstack/react-form";

export const SignUp = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
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
              onChangeAsync: ({ value }) =>
                value.length < 3 &&
                "Username must be at least 3 characters long",
            }}
            children={(field) => (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={form.reset}>
          Reset
        </Button>
        <Button onClick={form.handleSubmit}>Sign Up</Button>
      </CardFooter>
    </Card>
  );
};
