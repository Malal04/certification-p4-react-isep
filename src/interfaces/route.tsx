import { FC, ReactNode } from "react";

export interface Route {
  name: string;
  key: string;
  route: string;
  icon: any;
  component: FC | React.JSX.Element | ReactNode | null;
  authGuard?: boolean;
}
