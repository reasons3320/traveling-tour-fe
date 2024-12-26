const calculateAvgRating = (reviews) => {
  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating =
    totalRating === 0
      ? 0
      : totalRating === 1
      ? totalRating
      : (totalRating / reviews?.length || 1).toFixed(1);
      console.log(avgRating);
  return {
    totalRating,
    avgRating,
  };
};
export default calculateAvgRating;
