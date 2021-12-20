/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

// contents of the file object:
// path	{string}	Selected image location. This is null when the writeTempFile option is set to false.
// localIdentifier(ios only)	{string}	Selected images' localidentifier, used for PHAsset searching
// sourceURL(ios only)	{string}	Selected images' source path, do not have write access
// filename(ios only)	{string}	Selected images' filename
// width	{number}	Selected image width
// height	{number}	Selected image height
// mime	{string}	Selected image MIME type (image/jpeg, image/png)
// size	{number}	Selected image size in bytes
// duration	{number}	Video duration time in milliseconds
// data	{base64}	Optional base64 selected file representation
// exif	{object}	Extracted exif data from image. Response format is platform specific
// cropRect	{object}	Cropped image rectangle (width, height, x, y)
// creationDate (ios only)	{string}	UNIX timestamp when image was created
// modificationDate	{string}	UNIX timestamp when image was last modified

/**
 * This method uploads files and calls the callbacks multiple times, providing the progress percentage
 *
 * @param {object} file
 * @param {function} callbackProgress
 * @param {function} callbackSuccess
 * @param {function} callbackError
 */
const processAndUploadMediaFileWithProgressTracking = async (
  file,
  callbackProgress,
  callbackSuccess,
  callbackError,
) => {
  // process file (optionally using helper method) and start upload with progress tracking
  // resolve({ downloadURL: downloadURL }); if successful
  // resolve({ error: ErrorCode.photoUploadFailed }); if unsuccessful
  resolve({
    downloadURL:
      'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg',
  })
}

/**
 * processAndUploadMediaFile uploads files without progress tracking
 *
 * @param {object} file an object containing information about the file to be uploaded
 *
 * object format is described above
 *
 *
 */
const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    // process file (optionally using helper method) and start upload
    // resolve({ downloadURL: downloadURL }); if successful
    // resolve({ error: ErrorCode.photoUploadFailed }); if unsuccessful
    resolve({
      downloadURL:
        'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg',
    })
  })
}

const localStorage = {
  processAndUploadMediaFile,
  processAndUploadMediaFileWithProgressTracking,
}

export default localStorage
