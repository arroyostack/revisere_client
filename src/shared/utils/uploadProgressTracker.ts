export type UploadProgressCallback = (uploadProgressPercentage: number) => void;

export interface UploadProgressConfiguration {
  onProgress: UploadProgressCallback;
}

export async function uploadFileWithProgress(
  file: File,
  uploadUrl: string,
  configuration: UploadProgressConfiguration,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.upload.addEventListener('progress', (progressEvent: ProgressEvent<EventTarget>) => {
      if (progressEvent.lengthComputable) {
        const uploadProgressPercentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        configuration.onProgress(uploadProgressPercentage);
      }
    });

    xmlHttpRequest.addEventListener('load', () => {
      resolve(xmlHttpRequest.response);
    });

    xmlHttpRequest.addEventListener('error', () => {
      reject(new Error('Upload failed due to network error'));
    });

    xmlHttpRequest.addEventListener('abort', () => {
      reject(new Error('Upload was aborted'));
    });

    xmlHttpRequest.open('POST', uploadUrl);
    xmlHttpRequest.setRequestHeader('Accept', 'application/json');

    const formData = new FormData();
    formData.append('contractFile', file);

    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.send(formData);
  });
}

export async function uploadMultipleFilesWithProgress(
  firstFile: File,
  secondFile: File,
  uploadUrl: string,
  configuration: UploadProgressConfiguration,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.upload.addEventListener('progress', (progressEvent: ProgressEvent<EventTarget>) => {
      if (progressEvent.lengthComputable) {
        const uploadProgressPercentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        configuration.onProgress(uploadProgressPercentage);
      }
    });

    xmlHttpRequest.addEventListener('load', () => {
      resolve(xmlHttpRequest.response);
    });

    xmlHttpRequest.addEventListener('error', () => {
      reject(new Error('Upload failed due to network error'));
    });

    xmlHttpRequest.addEventListener('abort', () => {
      reject(new Error('Upload was aborted'));
    });

    xmlHttpRequest.open('POST', uploadUrl);
    xmlHttpRequest.setRequestHeader('Accept', 'application/json');

    const formData = new FormData();
    formData.append('firstContractFile', firstFile);
    formData.append('secondContractFile', secondFile);

    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.send(formData);
  });
}