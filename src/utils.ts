export function readFileAsync(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

// convert dataURL to File
export function dataUrlToFile(data: string) {
  let arr = data.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], "file", { type: mime });
}
