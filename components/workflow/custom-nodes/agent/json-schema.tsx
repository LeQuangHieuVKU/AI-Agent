import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputList,
} from "@/components/ui/tags-input";
import { fi } from "zod/v4/locales";

interface JsonSchemaProps {
  schema: any;
  onChange: (schema: any) => void;
}

const SchemaType = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  ENUM: "enum",
} as const;

export function JsonSchema({ schema, onChange }: JsonSchemaProps) {
  const properties = schema.properties || {};
  const [fields, setFields] = useState(
    Object.entries(properties).map(([name, config]: [string, any]) => ({
      name,
      type: config.enum ? "enum" : config.type,
      description: config.description || "",
      enumValues: config.enum?.join(", ") || "",
    })),
  );

  const updateSchema = (newFields: any) => {
    const props: any = {};
    newFields.forEach((f) => {
      if (!f.name) return;
      const field: any = {
        type: f.type === "enum" ? "string" : f.type,
        description: f.description || undefined,
        default: f.type === "number" ? 0 : f.type === "boolean" ? false : "",
      };
      if (f.type === "enum" && f.enumValuess) {
        field.enum = f.enumValues
          .split(",")
          .map((v: string) => v.trim())
          .filter(Boolean);
      }
      props[f.name] = field;
    });
    onChange({ type: "object", title: "Response Schema", properties: props });
  };

  const addField = () => {
    const newFields = [
      ...fields,
      { name: "", type: "string", description: "", enumValues: "" },
    ];
    setFields(newFields);
  };

  const updateField = (index: number, key: string, value: string) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [key]: value };
    setFields(newFields);
    updateSchema(newFields);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    updateSchema(newFields);
  };

  return (
    <div className="space-y-3">
      {fields.map((field, i) => (
        <Card key={i} className="px-3 pt-3">
          <div>
            <div className="flex gap-1">
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs">Name</Label>
                <Input
                  value={field.name}
                  onChange={(e) => updateField(i, "name", e.target.value)}
                  placeholder="field_name"
                  className="h-8 text-sm"
                />
              </div>
              <div className="shrink-0 space-y-1.5">
                <Label className="text-xs">Type</Label>
                <Select
                  value={field.type}
                  onValueChange={(v) => updateField(i, "type", v)}
                >
                  <SelectTrigger className="h-8 py-0 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SchemaType.STRING}>String</SelectItem>
                    <SelectItem value={SchemaType.NUMBER}>Number</SelectItem>
                    <SelectItem value={SchemaType.BOOLEAN}>Boolean</SelectItem>
                    <SelectItem value={SchemaType.ENUM}>Enum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={field.description}
                  onChange={(e) =>
                    updateField(i, "description", e.target.value)
                  }
                  rows={2}
                  placeholder="Optional description"
                  className="text-sm max-w-32 h-8"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeField(i)}
                className="h-4 w-4 mt-5"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {field.type === SchemaType.ENUM && (
              <div className="space-y-2">
                <Label className="text-xs">Enum Values</Label>
                <TagsInput
                  value={field.enumValues
                    .split(",")
                    .map((v: string) => v.trim())}
                  onValueChange={(values) =>
                    updateField(i, "enumValues", values.join(", "))
                  }
                >
                  <TagsInputList>
                    {field.enumValues
                      .split(",")
                      .map((v: string) => v.trim())
                      .map((value: string) => (
                        <TagsInputItem
                          key={value}
                          value={value}
                          className="bg-muted rounded-full text-xs"
                        >
                          {value}
                        </TagsInputItem>
                      ))}
                    <TagsInputInput placeholder="Type value and press enter" />
                  </TagsInputList>
                </TagsInput>
              </div>
            )}
          </div>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addField}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" /> Add Field
      </Button>
    </div>
  );
}
