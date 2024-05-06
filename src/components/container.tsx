import { ComponentProps } from "solid-js";
import { cn } from "../utils/cn";

interface ContainerProps extends ComponentProps<"div"> {}

const Container = ({ class: className, children, ...rest }: ContainerProps) => {
  return (
    <div class={cn("container mx-auto px-4", className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
