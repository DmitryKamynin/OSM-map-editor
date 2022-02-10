const getLot = (edge: number[][], lat: number): number => {
  const [lon1, lat1] = edge[1];
  const [lon2, lat2] = edge[0];
  const A = lon1 - lon2;
  const B = lat2 - lat1;
  const C = lat1 * lon2 - lat2 * lon1;
  const god = A * lat;
  const damn = god + C;
  return -(damn / B);
};

export default getLot;
