const getPointId = (flag: "max" | "min", points: number[][]): number => {
  const maxCoord = Math[flag](...points.map((points) => points[1]));
  return points.findIndex((points) => points[1] === maxCoord)!;
};

export default getPointId;
