export const setRandomImages = (array: Array<SVGAElement | any>) => {
    const newArray = array.map((item, index) => ({
      item,
      id: index,
      opened: false,
      uid: Math.random(),
    }));
    const data = [...newArray, ...newArray].sort(() => Math.random() - 0.5);
    return JSON.parse(JSON.stringify(data));
  };