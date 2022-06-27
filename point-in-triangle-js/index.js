// Heron Formula
const getArea = ([x1, y1], [x2, y2], [x3, y3]) =>
  Math.abs((x1 * y2 + x2 * y3 + x3 * y1 - y1 * x2 - y2 * x3 - y3 * x1) / 2);

const withinTriangle = (a, b, c, p) => {
  const [PAB, PBC, PAC] = [
    getArea(a, b, p),
    getArea(c, b, p),
    getArea(a, c, p),
  ];
  const ABC = getArea(a, b, c);

  const isWithingTriangle = ABC === PAB + PBC + PAC;

  return isWithingTriangle;
};