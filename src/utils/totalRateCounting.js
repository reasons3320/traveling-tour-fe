export const averageCounting = (array)=>{
  const average =  array.reduce((acc, item) => acc + item.rating, 0) / array.length || 0;
  return average;
}