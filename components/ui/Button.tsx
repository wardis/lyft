import { ButtonProps, Button as NextUIButton } from "@nextui-org/button";

export function Button(props: ButtonProps) {
  return (
    <NextUIButton variant="bordered" {...props}>
      {props.children}
    </NextUIButton>
  );
}
