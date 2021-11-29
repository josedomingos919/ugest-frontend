export const getFormatedDate = date => {
  //This code works for dates like this: 2021-09-23T15:13:38.856Z
  const formatedDate = new Date(date).toString().split(' ');
  const monthReturn = new Date(date).getMonth();

  console.log('FormatedDate: ', monthReturn);

  const day = formatedDate[2];
  const month = formatedDate[1];
  const formatedYear = formatedDate[3];

  return {
    date: `${month} ${day}/${formatedYear}`,
    month: monthReturn,
  };
};

export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
