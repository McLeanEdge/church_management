// Reads a FileList/array of image files and appends each as a new "photo"
// slide via the provided setSlides updater. Shared by the dashboard's
// quick-upload bar and the full Slide Manager modal.
export function addPhotoSlidesFromFiles(files, setSlides) {
  const list = Array.from(files || []);
  list.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const title = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      setSlides((prev) => [
        ...prev,
        {
          id: 'u' + Date.now() + idx,
          type: 'photo',
          src: ev.target.result,
          title,
          tag: 'Program',
          date: new Date().getFullYear().toString(),
        },
      ]);
    };
    reader.readAsDataURL(file);
  });
}
