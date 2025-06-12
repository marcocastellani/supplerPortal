import { ComponentDefault } from "@/types/ComponentDefault";
import { Container } from "@remira/unifiedui";
import { FC } from "react";

export interface IPageLayout extends ComponentDefault {
  isMicrofrontend?: boolean;
  children: React.ReactNode;
}

export const PageLayout: FC<IPageLayout> = ({ children, className, style }) => {
  return (
    <Container
      type="page"
      className={className}
      sx={{
        ...style,
      }}
      maxWidth={false}
    >
      {children}
    </Container>
  );
};
