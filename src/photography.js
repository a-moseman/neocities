const rotationScale = 5;
const photos = document.getElementsByClassName("photo");
let photo;
let rot;
let scale;
let dur;
for (let i = 0; i < photos.length; i++) {
    rot = (Math.random() - 0.5) * rotationScale;
    scale = 1.0 - Math.random() * 0.05;
    dur = Math.random() * 2000 + 2000;
    photo = photos[i];

    const keyframes = [
        { transform: `rotate(${rot}deg) scale(1)` },
        { transform: `rotate(${-rot}deg) scale(${scale})` },
        { transform: `rotate(${rot}deg) scale(1)` },
    ];

    const timing = {
        duration: dur,
        iterations: Infinity,
        easing: "ease-in-out"
    };

    photo.animate(keyframes, timing);

    //photo.style.transform = `rotate(${rot}deg)`;
}
