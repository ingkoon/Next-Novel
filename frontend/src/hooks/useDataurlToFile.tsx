export default function useDataurlToFile() {
  function dataurlToFile(imageSrcs: (string | undefined)[], order?: string) {
    //사실 undefined값을 들어오지 않는다.
    const byteStrings = imageSrcs.map((dataUrl) =>
      window.atob(dataUrl!.split(",")[1])
    );
    const arrays = byteStrings.map((byteString) => {
      let array = [];
      for (let i = 0; i < byteString.length; i++) {
        array.push(byteString.charCodeAt(i));
      }
      return array;
    });
    const myBlobs = arrays.map(
      (array) => new Blob([new Uint8Array(array)], { type: "image/png" })
    );
    const files = myBlobs.map(
      (myBlob, index) =>
        new File([myBlob], "".concat(order || "image", index + "", ".png"))
    );

    return files;
  }

  return { dataurlToFile };
}
