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

// Afin de mettre un lien youtube dans une balise <iframe> il faut le convertir dans un format spécifique
//  Lien de base -> https://www.youtube.com/watch?v=luXjNItbHC4
//  Lien final   -> https://www.youtube.com/embed/luXjNItbHC4
function toValideUrl(link) {
  const finalUrl = link.replace("watch?v=", "embed/");
  const Url = finalUrl.match(
    "^https://www.youtube.com/embed/[a-zA-Z0-9-_]{11}"
  );
  return Url;
}

export default {
  ytUrlToThumbnail,
  isYoutubeUrl,
  toValideUrl
};
