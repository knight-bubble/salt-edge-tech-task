import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Label } from "./label";
import { Spinner } from "./spinner";

const {
  fieldContext,
  formContext,
  useFieldContext: _useFieldContext,
  useFormContext,
} = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormItem,
    FormActionLabel,
  },
  formComponents: {
    SubmitButton,
  },
});

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function SubmitButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button
          onClick={() => form.handleSubmit()}
          className="w-full"
          type="submit"
          disabled={!canSubmit}
        >
          <Spinner show={isSubmitting} />
          {label}
        </Button>
      )}
    />
  );
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2 mt-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const useFieldContext = (): {
  id: string;
  name: string;
  store: any;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  errors: any[];
} & Record<string, any> => {
  const { id } = React.useContext(FormItemContext);
  const { name, store, ...fieldContext } = _useFieldContext();

  const errors = useStore(store, (state) => state.meta.errors);
  if (!fieldContext) {
    throw new Error("useFieldContext should be used within <FormItem>");
  }

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    errors,
    store,
    ...fieldContext,
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface FormActionLabelProps extends React.ComponentProps<typeof Label> {
  action?: React.ReactNode;
}

function FormActionLabel({
  className,
  action,
  ...props
}: FormActionLabelProps) {
  const { formItemId, errors } = useFieldContext();

  return (
    <div className="flex max-w-full justify-between items-center mb-2">
      <Label
        data-slot="form-label"
        data-error={!!errors.length}
        className={cn("data-[error=true]:text-destructive", className)}
        htmlFor={formItemId}
        {...props}
      />
      {action}
    </div>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { formItemId, errors } = useFieldContext();

  return (
    <Label
      data-slot="form-label"
      data-error={!!errors.length}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { errors, formItemId, formDescriptionId, formMessageId } =
    useFieldContext();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !errors.length
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!errors.length}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFieldContext();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { errors, formMessageId } = useFieldContext();
  const body = errors.length
    ? String(errors[0]?.message ?? "")
    : props.children;
  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export { useAppForm, useFieldContext, useFormContext, withForm };
export type { FormActionLabelProps };
