export interface DataType {
  id: number;
  info: string;
}
export function fetchData(): DataType[] {
  const data: DataType[] = [];
  for (let i = 0; i < 2000; i++) {
    data.push({
      id: i,
      info: "这是虚拟列表".repeat(Math.round(Math.random() * 100)),
    });
  }
  return data;
}
