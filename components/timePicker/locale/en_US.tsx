export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

const locale: TimePickerLocale = {
  placeholder: 'Select time',
  rangePlaceholder: ['Start time', 'End time'],
};

export default locale;
