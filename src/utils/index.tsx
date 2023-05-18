export const processText = (text: string) => {
  const textArr = text.split("\n")
  let text2 = []
  for (let i of textArr) {
    text2.push(<span>{i}</span>, <br />)
  }
  return text2;
}