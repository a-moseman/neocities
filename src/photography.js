const rotationScale = 8;
const photos = document.getElementsByClassName("photo");
let photo;
let rot;
for (let i = 0; i < photos.length; i++) {
    rot = (Math.random() - 0.5) * rotationScale;
    photo = photos[i];
    photo.style.transform = `rotate(${rot}deg)`;
}
