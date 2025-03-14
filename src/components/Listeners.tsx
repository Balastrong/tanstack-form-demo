import { useForm, useStore } from "@tanstack/react-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

const provinces = {
  Lombardia: [
    "Bergamo",
    "Brescia",
    "Como",
    "Cremona",
    "Lecco",
    "Milano",
    "Monza e Brianza",
    "Pavia",
    "Sondrio",
    "Varese",
  ],
  Marche: ["Ancona", "Ascoli Piceno", "Fermo", "Macerata", "Pesaro e Urbino"],
  Sardegna: ["Cagliari", "Nuoro", "Oristano", "Sassari", "Sud Sardegna"],
} as const;

const regions = Object.keys(provinces);

export const Listeners = () => {
  const onValueChange = (value: string) => {
    console.log(`Value changed to: ${value}`);
  };
  return <ListenersForm onValueChange={onValueChange} />;
};

const ListenersForm = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      region: "",
      province: "",
    },
    onSubmit: ({ value }) => console.log(value),
  });

  const region = useStore(form.store, (state) => state.values.region);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Field listeners</CardTitle>
            <CardDescription>
              Side effects with <span className="font-bold">@DevLeonardo</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <form.Field
                name="firstName"
                listeners={{
                  onChange: ({ value }) => onValueChange(value),
                }}
                children={(field) => (
                  <div>
                    <Label htmlFor={field.name}>First Name</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="region"
                listeners={{
                  onChange: () => form.setFieldValue("province", ""),
                }}
                children={(field) => (
                  <div>
                    <Label htmlFor={field.name}>Region</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue id={field.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region, index) => (
                          <SelectItem key={index} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <form.Field
                name="province"
                listeners={{
                  onChange: ({ value, fieldApi }) => {
                    const isConfirmed = window.confirm(
                      `Are you really in ${value}, ${fieldApi.form.getFieldValue(
                        "region"
                      )}?`
                    );

                    if (!isConfirmed) {
                      fieldApi.form.setFieldValue("region", "");
                      fieldApi.form.setFieldValue("province", "");
                    }
                  },
                }}
                children={(field) => (
                  <div>
                    <Label htmlFor={field.name}>Province</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      disabled={!region}
                    >
                      <SelectTrigger>
                        <SelectValue id={field.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces[region as keyof typeof provinces]?.map(
                          (province, index) => (
                            <SelectItem key={index} value={province}>
                              {province}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="px-12">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
