export const useUtilities = () => {
  const formatNumber = (value: number) => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // const formatDate = (value: string | number, format = 'DD MMM YYYY') => {
  //   return moment(value).format(format)
  // }
  return { formatNumber };
};
