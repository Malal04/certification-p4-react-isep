import { AxiosError } from "axios";

const convertToBase64 = (file: any) => {
  return new Promise<any>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const convertFromBase64 = (base64String: string, fileName: string) => {
  return new Promise<any>((resolve, reject) => {
    try {
      // Extract the content type and the base64 encoded data
      const arr = base64String.split(",");
      const mimeTypeMatch = arr[0].match(/:(.*?);/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "";
      const byteString = atob(arr[1]);

      // Convert the base64 string back into a byte array
      const byteNumbers = new Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create a file from the byte array
      const file = new File([byteArray], fileName, { type: mimeType });
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
};

const handleApiError = (err: any): string => {
  return err instanceof AxiosError
    ? err.response?.data?.errors?.[0]?.message
    : err.errors?.[0]?.message;
}

export { convertToBase64, convertFromBase64, handleApiError };
