export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

const locale: TimePickerLocale = {
  placeholder: '请选择时间',
  rangePlaceholder: ['开始时间', '结束时间'],
};

export default locale;
