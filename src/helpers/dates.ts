const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export const formatDate = (date: number | Date | undefined) => {
  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
};
