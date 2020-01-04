/**
 * Transforme un lien youtube en thumbnail
 * @param {string} link
 */
function ytUrlToThumbnail(url) {
  let youtubeId = url
    .match("=[a-zA-Z-0-9-_]{11}")
    .toString()
    .substr(1);

  let thumbnail = "https://img.youtube.com/vi/" + youtubeId + "/hqdefault.jpg";
  return thumbnail;
}

function isYoutubeUrl(url) {
  let p = /^(?:https:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return true;
  }
  return false;
}

export default {
  ytUrlToThumbnail,
  isYoutubeUrl
};
