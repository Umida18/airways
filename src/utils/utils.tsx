export const PriceComponent = ({ price }: { price: string }) => {
  const formatPrice = (price: string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return <div>{formatPrice(price)} SUM</div>;
};
