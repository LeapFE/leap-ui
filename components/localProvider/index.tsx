/* eslint-disable @typescript-eslint/ban-types */
import LocalProvider, { Locale } from "antd/lib/locale-provider";
import { ValidateMessages } from "rc-field-form/lib/interface";

export interface EnhancedLocale extends Locale {
  global?: Record<string, any>;
  Empty?: {
    description: string;
  };
  Icon?: Object;
  Text?: Object;
  Form?: {
    defaultValidateMessages: ValidateMessages;
  };
  PageHeader?: Object;
}
export default LocalProvider;
