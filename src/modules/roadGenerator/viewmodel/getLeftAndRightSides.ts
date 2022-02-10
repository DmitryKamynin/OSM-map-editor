const getLeftAndRightSides = (
  coords: number[][],
  startId: number,
  lastId: number
): [number[][], number[][]] => {
  console.log(startId, lastId);

  if (startId > lastId) {
    const firstLine = coords.slice(startId).concat(coords.slice(0, lastId + 1));
    const lastLine = coords.slice(lastId, startId + 1).reverse();
    return [firstLine, lastLine];
  } else if (startId === 0) {
    const firstLine = coords.slice(startId, lastId + 1);
    const lastLine = coords.slice(lastId).reverse();
    return [firstLine, lastLine];
  } else {
    const firstLine = coords.slice(startId, lastId + 1);
    const lastLine = coords
      .slice(lastId)
      .concat(coords.slice(0, startId + 1))
      .reverse();
    return [firstLine, lastLine];
  }
};

export default getLeftAndRightSides;
